<template>
  <header class="header">
    <h1 class="header__heading">Добавление товара</h1>
    <button class="header__button" type="button">По умолчанию</button>
  </header>
  <section class="wrapper">
    <form class="form">
      <label class="form__label form__label--is-required" for="title">Наименование товара</label>
      <input class="form__input" type="text" name="title" placeholder="Введите наименование товара">
      <label class="form__label" for="description">Описание товара</label>
      <textarea class="form__textarea" name="description" placeholder="Введите описание товара"></textarea>
      <label class="form__label form__label--is-required" for="image">Ссылка на изображение товара</label>
      <input class="form__input" type="text" name="image" placeholder="Введите ссылку">
      <label class="form__label form__label--is-required" for="price">Цена товара</label>
      <input class="form__input" type="text" name="price" placeholder="Введите цену">
      <label class="form__label"></label>
      <input class="form__input" type="submit" value="Добавить товар">
    </form>
    <div class="goods__items">
      <div class="goods__item">
        <div class="goods__image"></div>
        <div class="goods__description">
          <h1 class="goods__heading">Наименование товара</h1>
          <p class="goods__about">Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк</p>
          <p class="goods__price">10 000 руб.</p>
        </div>
      </div>
      <div class="goods__item">
        <div class="goods__image"></div>
        <div class="goods__description">
          <h1 class="goods__heading">Наименование товара</h1>
          <p class="goods__about">Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк</p>
          <p class="goods__price">10 000 руб.</p>
        </div>
      </div>
      <div class="goods__item">
        <div class="goods__image"></div>
        <div class="goods__description">
          <h1 class="goods__heading">Наименование товара</h1>
          <p class="goods__about">Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк</p>
          <p class="goods__price">10 000 руб.</p>
        </div>
      </div>
      <div class="goods__item">
        <div class="goods__image"></div>
        <div class="goods__description">
          <h1 class="goods__heading">Наименование товара</h1>
          <p class="goods__about">Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк</p>
          <p class="goods__price">10 000 руб.</p>
        </div>
      </div>
      <div class="goods__item">
        <div class="goods__image"></div>
        <div class="goods__description">
          <h1 class="goods__heading">Наименование товара</h1>
          <p class="goods__about">Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк</p>
          <p class="goods__price">10 000 руб.</p>
        </div>
      </div>
      <div class="goods__item">
        <div class="goods__image"></div>
        <div class="goods__description">
          <h1 class="goods__heading">Наименование товара</h1>
          <p class="goods__about">Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк</p>
          <p class="goods__price">10 000 руб.</p>
        </div>
      </div>
    </div>
  </section>
</template>