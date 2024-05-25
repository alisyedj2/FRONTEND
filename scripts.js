const products = [
    { id: 1, name: 'flowers', price: '60 &#8377', description: 'All flowrers availabale ', image: 'https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?cs=srgb&dl=pexels-jonaskakaroto-736230.jpg&fm=jpg' },
    { id: 2, name: 'books', price: '200 &#8377', description: 'All types of books available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlIVRa6P0P0SCimAIwenpxBIEXaflVkldMPQ&s' },
    { id: 3, name: 'bricks', price: '3000 &#8377', description: 'Good and Strong bricks available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwUMAAtsgSBRzVpfkvr7uPx-UsTHkxDinRyQ&s' },
    { id: 4, name: 'Granites', price: '10000 &#8377', description: 'Rajasthan bricks available', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVSO8SbkbkIRFeQ22Sv1Fs7SeVacs5MJTyw&s' },
    { id: 5, name: 'Stones', price: '360 &#8377', description: 'Big black stones for house construction avalable', image: 'https://www.shutterstock.com/shutterstock/photos/775255762/display_1500/stock-photo-big-black-rocks-or-stones-to-build-foundation-boundary-wall-in-a-construction-site-kerala-india-775255762.jpg' }
];

function displayProducts(productsToDisplay) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3>${product.price}</h3>
            <button><a href="https://api.whatsapp.com/send?phone=918008107550&text=Hi">Send Message</a></button>
            <button><a href="tel:8008107550">call me</a></button>
            </div>
        `;
        productList.appendChild(productElement);
    });

    document.getElementById('displayedCount').textContent = productsToDisplay.length;
}

function searchProducts() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('totalCount').textContent = products.length;
    displayProducts(products);
});
