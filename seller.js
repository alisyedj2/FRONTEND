document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const sellerIdInput = document.getElementById('sellerId');

    const apiBase = 'http://localhost:8080/api';

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const password = document.getElementById('password').value;

            fetch(`${apiBase}/sellers/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Login successful') {
                    localStorage.setItem('sellerName', name);
                    location.href = 'seller.html';
                } else {
                    alert('Invalid credentials');
                }
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const password = document.getElementById('password').value;

            fetch(`${apiBase}/sellers/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            })
            .then(response => response.json())
            .then(data => {
                alert('Registration successful. Please login.');
                location.href = 'login.html';
            });
        });
    }

    if (productForm) {
        const sellerName = localStorage.getItem('sellerName');

        fetch(`${apiBase}/sellers/me`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${sellerName}:`),
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(seller => {
            sellerIdInput.value = seller.id;
            fetchProducts(seller.id);
        });

        productForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const sellerId = sellerIdInput.value;
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;

            fetch(`${apiBase}/products`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${sellerName}:`),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sellerId, name, description, price })
            })
            .then(response => response.json())
            .then(product => {
                addProductToList(product);
                productForm.reset();
            });
        });
    }

    function fetchProducts(sellerId) {
        fetch(`${apiBase}/products/seller/${sellerId}`, {
            headers: {
                'Authorization': 'Basic ' + btoa(`${localStorage.getItem('sellerName')}:`),
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(products => {
            productList.innerHTML = '';
            products.forEach(addProductToList);
        });
    }

    function addProductToList(product) {
        const li = document.createElement('li');
        li.textContent = `${product.name} - $${product.price}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            fetch(`${apiBase}/products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + btoa(`${localStorage.getItem('sellerName')}:`),
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                li.remove();
            });
        });
        li.appendChild(deleteButton);
        productList.appendChild(li);
    }
});
