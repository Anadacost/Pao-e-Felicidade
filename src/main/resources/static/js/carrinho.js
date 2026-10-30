
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DO CARRINHO
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const subtotalElement = document.getElementById("subtotal");
    const totalQuantityElement = document.getElementById("totalQuantity");
    const totalElement = document.getElementById("total");
    const clearCartButton = document.getElementById("clearCart");
    const checkoutButton = document.getElementById("checkoutButton");

    // CARREGA OS PRODUTOS SALVOS
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // FORMATA O PREÇO
    function formatarPreco(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // SALVA O CARRINHO
    function salvarCarrinho() {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
    }

    // ATUALIZA O CONTADOR
    function atualizarContador() {

        const quantidadeTotal = carrinho.reduce(
            (total, produto) => total + Number(produto.quantidade),
            0
        );

        if (cartCount) {
            cartCount.textContent = quantidadeTotal;
        }
    }

    // ADICIONA PRODUTOS AO CARRINHO
    function adicionarProduto(produto) {

        const existente = carrinho.find(
            item => item.nome === produto.nome
        );

        if (existente) {
            existente.quantidade++;
        } else {
            carrinho.push({
                nome: produto.nome,
                preco: Number(produto.preco),
                imagem: produto.imagem,
                categoria: produto.categoria || "Produto",
                quantidade: 1
            });
        }

        salvarCarrinho();
        atualizarContador();

        alert(produto.nome + " foi adicionado ao carrinho!");
    }

    // BOTÕES ADICIONAR DAS PÁGINAS
    document.querySelectorAll(".add-cart").forEach(botao => {

        botao.addEventListener("click", () => {

            const produto = {
                nome: botao.dataset.name,
                preco: botao.dataset.price,
                imagem: botao.dataset.image,
                categoria: botao.dataset.category || "Food to Save"
            };

            if (!produto.nome || !produto.preco) {
                alert("Não foi possível adicionar este produto.");
                return;
            }

            adicionarProduto(produto);
        });

    });

    // MOSTRA OS PRODUTOS NO CARRINHO
    function mostrarCarrinho() {

        if (!cartItems) {
            return;
        }

        cartItems.innerHTML = "";

        if (carrinho.length === 0) {

            cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-icon">🛒</div>
                    <h3>Seu carrinho está vazio</h3>
                    <p>Adicione produtos para começar seu pedido.</p>
                    <a href="/" class="empty-button">
                        Ver produtos
                    </a>
                </div>
            `;

            if (subtotalElement) {
                subtotalElement.textContent = "R$ 0,00";
            }

            if (totalElement) {
                totalElement.textContent = "R$ 0,00";
            }

            if (totalQuantityElement) {
                totalQuantityElement.textContent = "0";
            }

            if (checkoutButton) {
                checkoutButton.disabled = true;
            }

            atualizarContador();
            return;
        }

        let subtotal = 0;
        let quantidadeTotal = 0;

        carrinho.forEach((produto, index) => {

            const totalProduto =
                Number(produto.preco) * Number(produto.quantidade);

            subtotal += totalProduto;
            quantidadeTotal += Number(produto.quantidade);

            const item = document.createElement("div");
            item.className = "cart-item";

            // CRIA OS ELEMENTOS COM SEGURANÇA
            const imagem = document.createElement("img");
            imagem.src = produto.imagem || "";
            imagem.alt = produto.nome;
            imagem.className = "product-image";

            const informacoes = document.createElement("div");
            informacoes.className = "product-information";

            const categoria = document.createElement("span");
            categoria.className = "product-category";
            categoria.textContent = produto.categoria || "Produto";

            const nome = document.createElement("h3");
            nome.className = "product-name";
            nome.textContent = produto.nome;

            const preco = document.createElement("p");
            preco.className = "product-price";
            preco.textContent = formatarPreco(produto.preco);

            const quantidadeArea = document.createElement("div");
            quantidadeArea.className = "quantity-area";

            const diminuir = document.createElement("button");
            diminuir.className = "quantity-button";
            diminuir.dataset.action = "diminuir";
            diminuir.dataset.index = index;
            diminuir.textContent = "−";

            const quantidade = document.createElement("span");
            quantidade.className = "quantity-number";
            quantidade.textContent = produto.quantidade;

            const aumentar = document.createElement("button");
            aumentar.className = "quantity-button";
            aumentar.dataset.action = "aumentar";
            aumentar.dataset.index = index;
            aumentar.textContent = "+";

            const remover = document.createElement("button");
            remover.className = "remove-button";
            remover.dataset.action = "remover";
            remover.dataset.index = index;
            remover.textContent = "Remover produto";

            const total = document.createElement("strong");
            total.className = "product-total";
            total.textContent = formatarPreco(totalProduto);

            quantidadeArea.append(
                diminuir,
                quantidade,
                aumentar
            );

            informacoes.append(
                categoria,
                nome,
                preco,
                quantidadeArea,
                remover
            );

            item.append(
                imagem,
                informacoes,
                total
            );

            cartItems.appendChild(item);
        });

        if (subtotalElement) {
            subtotalElement.textContent = formatarPreco(subtotal);
        }

        if (totalElement) {
            totalElement.textContent = formatarPreco(subtotal);
        }

        if (totalQuantityElement) {
            totalQuantityElement.textContent = quantidadeTotal;
        }

        if (checkoutButton) {
            checkoutButton.disabled = false;
        }

        atualizarContador();
    }

    // AÇÕES DOS BOTÕES DO CARRINHO
    if (cartItems) {

        cartItems.addEventListener("click", event => {

            const botao = event.target.closest("button");

            if (!botao) {
                return;
            }

            const acao = botao.dataset.action;
            const index = Number(botao.dataset.index);

            if (!Number.isInteger(index) || !carrinho[index]) {
                return;
            }

            if (acao === "aumentar") {
                carrinho[index].quantidade++;
            }

            if (acao === "diminuir") {

                carrinho[index].quantidade--;

                if (carrinho[index].quantidade <= 0) {
                    carrinho.splice(index, 1);
                }
            }

            if (acao === "remover") {
                carrinho.splice(index, 1);
            }

            salvarCarrinho();
            mostrarCarrinho();
        });

    }

    // LIMPAR CARRINHO
    if (clearCartButton) {

        clearCartButton.addEventListener("click", () => {

            if (carrinho.length === 0) {
                return;
            }

            const confirmar = confirm(
                "Deseja realmente limpar o carrinho?"
            );

            if (confirmar) {
                carrinho = [];
                salvarCarrinho();
                mostrarCarrinho();
            }

        });

    }

    // FINALIZAR COMPRA
    if (checkoutButton) {

        checkoutButton.addEventListener("click", () => {

            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio.");
                return;
            }

            // Ainda não existe uma rota de pagamento implementada.
            alert(
                "Seu pedido está pronto! A página de pagamento " +
                "precisa ser implementada para continuar."
            );

        });

    }

    // INICIALIZA O CARRINHO EM TODAS AS PÁGINAS
    atualizarContador();
    mostrarCarrinho();

});
