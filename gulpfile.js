let gulp = require('gulp');
let gulpLoadPlugins = require('gulp-load-plugins');
let yargs = require('yargs');
let sass = require('gulp-sass')(require('node-sass'));

let errorHandler;

let argv = yargs.default({
	cache: true,
	debug: true,
	fix: false,
	minifyHtml: null,
	minifyCss: null,
	minifyJs: null,
	minifySvg: null,
	notify: true,
	open: true,
	port: 3000,
	spa: false,
	throwErrors: false,
	robots: true,
}).argv;

argv.minify = !!argv.minify;
argv.minifyHtml = argv.minifyHtml !== null ? !!argv.minifyHtml : argv.minify;
argv.minifyCss = argv.minifyCss !== null ? !!argv.minifyCss : argv.minify;
argv.minifyJs = argv.minifyJs !== null ? !!argv.minifyJs : argv.minify;
argv.minifySvg = argv.minifySvg !== null ? !!argv.minifySvg : argv.minify;

let $ = gulpLoadPlugins({
	overridePattern: false,
	pattern: [
		'autoprefixer',
		'browser-sync',
		'connect-history-api-fallback',
		'cssnano',
		'emitty',
		'imagemin-mozjpeg',
		'merge-stream',
		'postcss-reporter',
		'postcss-scss',
		'stylelint',
		'uglifyjs-webpack-plugin',
		'vinyl-buffer',
		'webpack',
		'webpack-stream',
		'append-prepend',
	],
	scope: [
		'dependencies',
		'devDependencies',
		'optionalDependencies',
		'peerDependencies',
	],
});

if (argv.throwErrors) {
	errorHandler = false;
} else if (argv.notify) {
	errorHandler = $.notify.onError('<%= error.message %>');
} else {
	errorHandler = null;
}

gulp.task('copy', () => {
	return gulp.src([
		'src/resources/**/*.*',
		'src/resources/**/.*',
		'!src/resources/**/.keep',
	], {
		base: 'src/resources',
		dot: true,
	})
		.pipe($.if(argv.cache, $.newer('public')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe(gulp.dest('public'));
});

gulp.task('images', () => {
	return gulp.src('src/images/**/*.*')
		.pipe($.if(argv.cache, $.newer('public/images')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe(gulp.dest('public/images'));
});

gulp.task('scss', () => {
	const postcssPlugins = [
		$.autoprefixer({
			grid: 'autoplace',
		}),
	];

	if (argv.minifyCss) {
		postcssPlugins.push(
			$.cssnano({
				preset: [
					'default',
					{
						discardComments: {
							removeAll: true,
						},
					},
				],
			}),
		);
	}

	return gulp.src([
		'src/scss/*.scss',
		'!src/scss/_*.scss',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe($.postcss(postcssPlugins))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('src/assets'));
});

gulp.task('lint', () => {
	return gulp.src([
		'src/scss/**/*.scss',
		'!src/scss/vendor/**/*.scss',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.postcss([
			$.stylelint(),
			$.postcssReporter({
				clearReportedMessages: true,
				throwError: argv.throwErrors,
			}),
		], {
			parser: $.postcssScss,
		}));
});

gulp.task('watch', () => {
	gulp.watch([
		'src/resources/**/*.*',
		'src/resources/**/.*',
	], gulp.series('copy'));

	gulp.watch('src/images/**/*.*', gulp.series('images'));

	gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
});


gulp.task('build', gulp.series(
	'copy',
	gulp.parallel(
		'scss',
	),
));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel(
		'watch',
	),
));
