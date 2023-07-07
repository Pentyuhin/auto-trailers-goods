const API = 'https://raw.githubusercontent.com/Pentyuhin/trailer-json/main';



class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = [];
        this._init();
    }

    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    // handleData(data) {
    //     this.goods = [...data];
    //     this.render();
    // }

    // render() {
    //     const block = document.querySelector(this.container);
    //     for (let product of this.goods) {
    //         const productObj = new this.list[this.constructor.name](product);
    //         // console.log(productObj);
    //         this.allProducts.push(productObj);
    //         block.insertAdjacentHTML('beforeend', productObj.render());
    //     }
    // }

    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('invisible-product');
            } else {
                block.classList.remove('invisible-product');
            }
        })
    }

    _init() {
        return false
    }
}


class Item {
    constructor(el) {
        this.product_name = el.product_name;
        this.price = el.price;
        this.description = el.description;
        this.id_product = el.id_product;
        this.img = el.imgPath;
        this.factory = el.factory;
        this.imgFactory = el.imgFactory;
        this.appellation = el.appellation;
        this.execution = el.execution;

    }
    render() {
        //генерация товара для каталога товаров
        return `<div class="product-item" data-id="${this.id_product}">
        <img class="product-img popup-link" loading="lazy" src="${this.img}" alt="Some img">
        <img class="product-img-factory" loading="lazy" ${this.factory === "AVTOS" ? `width="40px"` : `width="85px"`} src="${this.imgFactory}" alt="Factory">
        <div class="desc">
        <div class="product-block-title">
            <h3 class="product-title">${this.product_name}</h3>
            ${this.factory === "МЗСА" ? `<p class="product-title-option">Наименование: ${this.appellation}</p>` : ""}
            ${this.factory === "МЗСА" ? `<p class="product-title-option">Исполнение: ${this.execution}</p>` : ""}
        </div>
            <div class="product-info">
                <p>${this.price} &#8381</p>
                <a href="tel:89771016953" class="buy-btn" data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Заказать</a>
            </div>
            <div><p class="product-description">${String(this.description)}</p></div>
            <div class="product-discount">   
                <p><span><img src="./img/sb-logo.svg"></span>Рассрочка от Сбербанка</p>
            </div>
        </div>
    </div>`
    }
}


class ProductItem extends Item { }

class ProductsList extends List {
    constructor(container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.perPage = 9;
        this.currentPage = 1;
        this.totalPages = 0;
        this.getJson()
            .then(data => {
                for (let item of data) {
                    // item.imgPath = `img / trailers / ${ item.id_product }.jpg`;
                    this.goods.push(item);
                    if (item.factory === "МЗСА") {
                        item.imgFactory = `img/logo/logoMzsa.svg`;
                        item.imgPath = `img/trailers/${item.id_product}.jpg`;
                        this.goods.push(item);
                    }
                    if (item.factory === "AVTOS") {
                        item.imgFactory = `img/logo/logoAvtos.svg`;
                        item.imgPath = `img/trailers/no-foto.jpg`;
                        this.goods.push(item);
                    }
                    if (item.factory === "Русич") {
                        item.imgFactory = `img/logo/logoRus.svg`;
                        item.imgPath = `img/trailers/no-foto.jpg`;
                        this.goods.push(item);
                    }
                    if (item.factory === "ATLANT") {
                        item.imgFactory = `img/logo/Atlant.svg`;
                        item.imgPath = `img/trailers/${item.id_product}.jpg`;
                        this.goods.push(item);
                    }

                }
                this.handleData(data);
                this.totalPages = Math.ceil(this.allProducts.length / this.perPage);
                this.renderPagination();
            });
    }


    // --- Pagination with number ---

    handleData(data) {
        this.allProducts = [...data].map(product => new this.list[this.constructor.name](product));
        this.goods = [...this.allProducts];
        this.render();
    }

    render() {
        const block = document.querySelector(this.container);
        const start = (this.currentPage - 1) * this.perPage;
        const end = start + this.perPage;
        const productsToRender = this.goods.slice(start, end);
        block.innerHTML = '';
        for (let product of productsToRender) {
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }

    // -------------------------

    // render() {
    //     const block = document.querySelector(this.container);
    //     const start = (this.currentPage - 1) * this.perPage;
    //     const end = start + this.perPage;
    //     const productsToRender = this.goods.slice(start, end);
    //     for (let product of productsToRender) {
    //         const productObj = new this.list[this.constructor.name](product);
    //         this.allProducts.push(productObj);
    //         block.insertAdjacentHTML('beforeend', productObj.render());
    //     }
    // }


    // --- Pagination with number ---

    renderPagination() {
        const paginationContainer = document.querySelector('.pagination');
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= this.totalPages; i++) {
            const pageLinks = `<a href="#" data-page="${i}" ${i === this.currentPage ? 'class="pagination-active"' : 'class=""'}> ${i}</a> `;
            paginationContainer.insertAdjacentHTML('beforeend', pageLinks);
        }
        const pageLinks = document.querySelectorAll('.pagination a');
        pageLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const pageNumber = parseInt(e.target.dataset.page);
                this.currentPage = pageNumber;
                if (!e.target.classList.contains('pagination-active')) {
                    pageLinks.forEach(el => {
                        if (el.classList.contains('pagination-active')) {
                            el.classList.remove('pagination-active')
                        }
                    })
                    e.target.classList.add('pagination-active');
                }
                this.render();
            });
        });
    }

    // renderPagination() {
    //     const paginationContainer = document.querySelector('.pagination');
    //     paginationContainer.innerHTML = '';

    //     const loadMoreButton = document.createElement('button');
    //     loadMoreButton.classList.add('load-more-button');
    //     loadMoreButton.textContent = `Load More`;


    //     loadMoreButton.addEventListener('click', () => {
    //         this.currentPage++;
    //         this.render();
    //     });

    //     paginationContainer.appendChild(loadMoreButton);
    // }


    filterProducts(value, factoryChecked) {
        const regexp = new RegExp(value, 'i');
        let factoryRegxp;
        if (factoryChecked === 'МЗСА') {
            factoryRegxp = /МЗСА/i;
        } else if (factoryChecked === 'AVTOS') {
            factoryRegxp = /AVTOS/i;
        } else if (factoryChecked === 'Русич') {
            factoryRegxp = /Русич/i;
        } else {
            factoryRegxp = /./;
        }
        if (value === '') {
            // если фильтруем только по фабрике
            this.filtered = this.allProducts.filter(product => factoryRegxp.test(product.factory));
        } else {
            // если фильтруем по фабрике и названию
            this.filtered = this.allProducts.filter(product => factoryRegxp.test(product.factory) && regexp.test(product.product_name));
        }
        this.goods = [...this.filtered];
        this.totalPages = Math.ceil(this.goods.length / this.perPage);
        this.currentPage = 1;
        this.renderPagination();
        this.render();
    }

    filterCheckbox() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]:checked')
        let values = [];
        checkboxes.forEach((checkbox) => {
            values.push(checkbox.value);
        });
        return String(values)
    }

    myClickCheckbox() {
        this.filterProducts('', this.filterCheckbox())
    }

    myClickFactory(value) {
        if (!!this.filterCheckbox()) {
            this.filterProducts(value, this.filterCheckbox())
        } else {
            this.filterProducts(value, null)
        }
    }

    _init() {
        // document.querySelector(this.container).addEventListener('click', e => {
        //     if (e.target.classList.contains('buy-btn')) {
        //         this.cart.addProduct(e.target);
        //     }
        // });

        const links = document.querySelectorAll('.parameters');
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                if (!e.target.classList.contains('parameters-active')) {
                    links.forEach(el => {
                        if (el.classList.contains('parameters-active')) {
                            el.classList.remove('parameters-active')
                        }
                    });
                    e.target.classList.add('parameters-active');
                }
            })
        })

    }
}

const list2 = {
    ProductsList: ProductItem,
};

let products = new ProductsList();



