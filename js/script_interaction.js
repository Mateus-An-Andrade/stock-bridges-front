document.addEventListener('DOMContentLoaded', function() {
  alert("Página carregada!");
})
//======pegando a div e seus elementos (botões) por IDs para acessa-los diretamente por código============

//menu principal do sistema:
let uppermenu = document.getElementById("options_btns")


//---->botão de cadastrar e seus sub-elementos:
let new_register = document.getElementById("register_btn");
    let new_worker = document.getElementById("register_btn_new_worker");
        let button_register_worker = document.getElementById("submit_register_worker")
    let new_product = document.getElementById("register_btn_new_product")
        let button_register_products = document.getElementById("submit_register_products")

// --->botão de requisição e menu que vai requisitar os produtos: 
let new_request = document.getElementById("requests_btn");
    let request_menu = document.getElementById ("request_menu");
    const select_products_btn = document.querySelector("#select_products_button");
    let search_products_button = document.getElementById("search_products_button_request")
    const query_product_data_base_form = document.getElementById("query_product_data_base_form")
    const tabelaResultados = document.querySelector(".descrição_pesquisa_de_produtos"); 
    let select_this = document.querySelector(".selecionar_esse_checkbox")
    let quantity_needed = 0
    let SelectedProducts = []




 

// --->botão de devolução dos produtos:     


// --->botão de registros do sistema: 
let query_historic = document.getElementById("historic_btn");
    let historic_menu = document.getElementById("historic_menu")
    let registration_tab = document.getElementById("registration_tab")

    let options_of_registers = document.getElementById("options_of_registers")

    let record_tab_product = document.getElementById("record_tab_product")
        let record_product = document.getElementById("record_product")

    let record_tab_worker = document.getElementById("record_tab_worker")
        let record_worker = document.getElementById("record_worker")

    let solicitation_tab = document.getElementById("solicitation_tab")  
        let choice_search_request = document.getElementById("choice_search_request")
        let search_options = document.getElementsByName("search_options_requests");
        let selected_option = [...search_options].find(radio => radio.checked); 
        let data_collect_consult_request = document.getElementById("data_collect_consult_request")
        let alternate_content = document.getElementById ("alternate_content") 
        let button_search_register = document.getElementById("search_register_data_base")
        let table_requests_registers = document.getElementById("table_requests_registers")
        let backdoor_table_request= document.getElementById("backdoor_table_request")

    let approval_tab_register = document.getElementById("approval_tab_register")
        let choice_search_approval = document.getElementById("choice_search_approval")
        let search_options_approval = document.getElementsByName("search_options_approval")
        let selected_option_approval = [...search_options_approval].find(radio => radio.checked); 
        let alternate_content_approval = document.getElementById("alternate_content_approval")
        let data_collect_consult_approval = document.getElementById("data_collect_consult_approval")
        let button_search_approval = document.getElementById("search_register_data_base_approval")
        let table_approval_registers = document.getElementById("table_approval_registers")
        let backdoor_table_approval = document.getElementById("backdoor_table_approval")

    let devolution_tab_register = document.getElementById("devolution_tab_register")
        let choice_search_devolution = document.getElementById("choice_search_devolution")
        let search_options_devolution = document.getElementsByName("search_options_devolution")
        let selected_option_devolution = [...search_options_devolution].find(radio => radio.checked)
        let data_collect_consult_devolution = document.getElementById("data_collect_consult_devolution")
        let button_search_devolutions = document.getElementById("search_register_data_base_devolutions")
        let table_devolution_registers = document.getElementById("table_devolution_registers")
        let backdoor_table_devolution = document.getElementById("backdoor_table_devolution")

    let inventory_tab_register = document.getElementById("inventory_tab_register")
        let choice_search_inventory = document.getElementById("choice_search_inventory")
        let search_options_inventory = document.getElementsByName("search_options_inventory")
        let selected_options_inventory = [...search_options_inventory].find(radio => radio.checked)
        let data_collect_consult_inventory = document.getElementById("data_collect_consult_inventory")
        let alternate_content_inventory = document.getElementById("alternate_content_inventory")
        let button_search_register_inventory = document.getElementById("search_register_data_base_inventory")
        let table_inventory_registers = document.getElementById("table_inventory_registers")
        let backdoor_table_inventory = document.getElementById("backdoor_table_inventory")
        


let query_inventory = document.getElementById("inventory_btn")
    let inventory_menu = document.getElementById("inventory_menu")
    let button_alter_inventory = document.getElementById("alter_in_inventory")



// --->mensagens de confirmação: 
const confirm_mensage = document.getElementById("confirmed")
    let confirmed_simbol = document.getElementById("confirmed_simbol")
    let confirmed_descreption = document.getElementById("confirmed_descreption")
    let denied_simbol = document.getElementById("denied_simbol")
    let denied_mensage = document.getElementById("denied")
    

//============================================================================================================
function close_windows (id){
    const window_to_close = document.getElementById(id)

    if (window_to_close){
        window_to_close.querySelector(".fechar_janela").addEventListener("click", function(){
            window_to_close.style.display = "none"; 
            history.replaceState({},"","/homepage")
            uppermenu.style.display = "flex";
        });
    }
}


function close_sub_windows(id){
    const window_to_close = document.getElementById(id)

    if (window_to_close){
        window_to_close.querySelector(".fechar_janela").addEventListener("click", function(){
            window_to_close.style.display = "none"; 
            uppermenu.style.display = "none";
            document.getElementById("blur-overlay").style.display = "none"
        });
    }
}



//================ adicionando a função de login ================================================

login_form = document.getElementById("login_form")

login_form.addEventListener("submit",function(e){
    e.preventDefault();
    login_autorization();
})

async function login_autorization(){
    const user_name = document.getElementById("username")
    const password_user = document.getElementById("password")

    try{
        const response_system = await fetch("https://stockbridges.onrender.com/main",{
             method: "POST",
             headers:{"Content-Type": "application/json"},
             body: JSON.stringify({   
                                    usuario: user_name.value,
                                    senha: password_user.value
                                })
        })

        const data = await response_system.json();
        console.log("Resposta recebida:", data);


        if (data.status === "ok"){
            window.location.href = "/main.html"
        } else{
            document.getElementById("mensagem-erro").textContent = data.mensagem || "Usuário ou senha inválidos.";
        }

    }catch (erro) {
    console.error("Erro ao fazer login:", erro);
    document.getElementById("mensagem-erro").textContent = "Erro de conexão com o servidor.";
  }
}

//================ adicionando a função ao botão de cadastramento ================================================


function SetupRegister(new_register, new_worker, new_product, button_register_worker, button_register_products, confirm_mensage){
    if (new_register){
        new_register.addEventListener('click', function(){
            document.getElementById("register_menu").style.display = "block";
            uppermenu.style.display = 'none';
    
    //se o cadastro for de funcionarios: código que direciona para a seção de cadastramento de funcionarios:
            if(new_worker){
                new_worker.addEventListener('click', function(){
                    document.getElementById('func_register').style.display = "grid";
                    document.getElementById('space_products').style.display = "none";
                    history.replaceState({},"","/register_worker")
                    new_product.style.opacity = '0.5';
                    new_worker.style.opacity = '1';
                    button_register_worker.style.display = "block";
                });
    
                if (button_register_worker){
                    button_register_worker.addEventListener('click', function(){
                        document.getElementById("register_menu").style.display = "none";
                        confirm_mensage.style.display = 'flex';
    
                        setTimeout(() => {
                            confirm_mensage.style.display = 'none';
                            document.getElementById("register_menu").style.display = "block";
                        }, 3000);
                    });
                }
            }
    
    
    //se o cadastro for de produtos: código que direciona para a seção de cadastramento de produtos:
            if(new_product){
                new_product.addEventListener('click', function(){
                    document.getElementById('space_products').style.display = "grid";
                    document.getElementById('func_register').style.display = "none";
                    history.replaceState({},"","/register_product")
                    new_product.style.opacity = '1';
                    new_worker.style.opacity = '0.5';
                    button_register_products.style.display = "block";
                });
    
                if (button_register_products){
                    button_register_products.addEventListener('click', function(){
                        document.getElementById("register_menu").style.display = "none";
                        confirm_mensage.style.display = 'flex';
                        setTimeout(() => {
                            corfirm_mensage.style.display = 'none';
                            document.getElementById("register_menu").style.display = "block";
                        }, 3000);
    
                    });
                }
            }
        });
    }
close_windows("register_menu");
    
}      
//=============================FIM DA FUNÇÃO========================================================================= 

//================ adicionando a função ao botão de solicitações ================================================

function SetupRequest(new_request, query_product_data_base_form, table_products, select_products_btn, confirm_mensage){
    if (new_request){
        new_request.addEventListener('click',function(){
        request_menu.style.display = 'block';
        history.replaceState({},"","/request_menu")
        uppermenu.style.display = 'none';
    });

                                                                            //acima temos o inicio da interação com o menu de requisição: o código esconde o menu principal; mostra o menu de requisição com o campo de pesquisa e resultados da mesma quando feita.


    if (query_product_data_base_form){
        query_product_data_base_form.addEventListener('submit', async e=>{
            e.preventDefault()
            
            tabelaResultados.style.display = "flex"
            select_products_btn.style.display = "flex"

            const formData = new FormData(query_product_data_base_form);
            const params = new URLSearchParams(formData).toString();

            const response = await fetch(`/request_menu?${params}`,{
                method: "GET"
            })

            const products = await response.json();

                                                                            //o código acima faz o impedimento da atualização da página e faz o formulário obter os dados através do GET esperando uma resposta JSON.

            let table_products =`
                <tr>
                        <th class="codigo_descricao">Código:</th>
                            <th class="descrição_pesquisa">Descrição:</th>
                            <th class="quantidade_descricao">Quantidade:</th>
                </tr>`

                products.forEach(p => {

                    table_products += `
                    <tr class="resultados_pesquisa_de_produtos">
                        <td class="codigo_resultado">${p.codigo}</td>
                        <td class="descrição_resultado">${p.nome}</td>
                        <td class="quantidade_disponivel">${p.quantidade || "N/A"}</td>
                        <td class="selecionar_esse">
                            <input type="checkbox" class="selecionar_esse_checkbox"> 
                            <input type="number" class="quantidade_necessaria" value="${p.quantidade || 0}"> 
                        </td>
                    </tr>
                    `
                })
                

            tabelaResultados.innerHTML = table_products;
        })
    }
    

                                                                            //Acima o código retorna os resultados da pesquisa para a tabela presente no HTML, cada resultado é mostrado devidamente como consta no banco de dados.


    
    table_products.addEventListener('change', function(event){

        if (event.target && event.target.classList.contains('selecionar_esse_checkbox')) {

            const select_this = event.target;
            const row = select_this.closest('tr');
            if (!row) return;

            const is_checked = select_this.checked

            let quantity_information = row.querySelector('.quantidade_necessaria').value

            quantity_information = quantity_information && ! isNaN(quantity_information) ? parseInt(quantity_information): 0

            const product_needed = {
                codigo: row.querySelector('.codigo_resultado').innerText,
                descricao: row.querySelector('.descrição_resultado').innerText,
                quantidade: quantity_information
            };
                                                                            //acima o código está: 
                                                                            // pegando os dados dos itens que foram selecionados pelo usuário e colocando em um dicionario, mas ele apenas "captura" a quantidade quando selecionado, ou seja, se selecionar primeiro e alterar depois, a quantidade alterada não vai, mas sim a que estava no momento do check.

            if (is_checked) {
                    SelectedProducts.push(product_needed);
                } else {
                    SelectedProducts = SelectedProducts.filter(product => product.codigo !== product_needed.codigo);
                }
                                                                            // acima temos cada produto marcado sendo colocado em um array, criando uma estrutura JSON.

                    if (is_checked){
                        quantity_needed+=1

                    } else{ 
                        quantity_needed-=1

                    }

                    select_products_btn.value = `selecionar (${quantity_needed})`
                }
                    
    });

                                                                            //Acima o código realiza a seguinte tarefa: ele "nota" cada linha de resultados trazidos do servidor; e quando o usuário clica nos check-boxes indicando quais items são necessários ele altera dinamicamente a quantidade no botão "selecionar()" fazendo o mesmo quando ele desmarca.
         
    }
    
         if(select_products_btn){
             select_products_btn.addEventListener('click', function (){

                if (SelectedProducts.length > 0) {

                
                const worker_log = document.getElementById("worker_log").value
                const positon_worker = document.getElementById("positon_worker").value

                const request_user_data ={
                    username: worker_log,
                    position: positon_worker,
                    SelectedProducts: SelectedProducts 
                }
                                                                            //acima o código captura o momento do clique no botão "selecionar()" se a quantidade for maior que 0 ele envia a requisição para o banco de dados, se for igual a 0 ele simplesmente ignora e fica com o menu aberto esperando alguma seleção. Ele também pega o nome e o cargo do solicitante que está fazendo a requisição do produto e criando um JSON contendo as informações do solicitante e os produtos que ele solicitou.


                fetch('/request_menu',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    },

                        body:  JSON.stringify(request_user_data)
                })

                    .then(response => response.json())
                    .then(data => 
                        console.log("Requisição realizada: ", data.message))
                        SelectedProducts = [];
                        
                        request_menu.style.display = 'none';
                         confirm_mensage.style.display = 'flex';
                         confirmed_descreption.textContent = "SOLICITAÇÃO REALIZADA"
                             setTimeout(()=>{
                                 confirm_mensage.style.display = 'none';
                                 uppermenu.style.display = 'flex';
                                 history.replaceState({},"","/homepage")
                                 confirmed_descreption.textContent = "CADASTRO REALIZADO"
                                // location.reload()
                             }, 3000)

                                                                                // acima temos a requisição fetch, enviando os dados para o flask, para que ele envie os dados JSON para o banco de dados. O reload é feito para que os dados não fiquem salvos no navegador e ter um funcionamento mais preciso do sistema.
                            }
                     })
            }
    close_windows("request_menu"); 
};

             
//=============================FIM DA FUNÇÃO=========================================================================  

//================ adicionando a função ao botão de solicitações ================================================

function SetupAceppt(){
 // --->botão de aprovação e menu que vai aprovar ou recusar solicitações os produtos: 
    const new_aceppt = document.getElementById("acepttance_btn");
    const acepttance_menu = document.getElementById("acceptance_menu")
    const requests_users = document.getElementById("requests_users")
    const devolutions_users = document.getElementById("devolutions_users")
    const field_requests = document.querySelector(".solicitacoes_usuarios")
    const requests_names = document.querySelector(".usuario_solicitante")
    const frame_table = document.querySelector(".quadro_da_tabela")
    const table_acceptance = document.querySelector(".tabela")
        const cell_name = document.querySelector(".nome_solicitante")
        const cell_function_request = document.querySelector(".funcao_solicitante")
        const cell_product_request = document.querySelector(".produto_descrito")
        const cell_code_product_request = document.querySelector(".codigo_produto_descrito")
        const cell_descreption_quantity = document.querySelector(".quantidade_descrita")
    const yes_or_no = document.querySelector(".aceitar_ou_negar")
    const accept_yes = document.querySelector(".accept_yes")
    const no_accept = document.querySelector(".no_accept")

    let requests = []

    let requests_devolutions = []



    if (new_aceppt){
        new_aceppt.addEventListener('click',function(){
            acepttance_menu.style.display = 'block';
            uppermenu.style.display = 'none'

                                                                                    //acima o código faz o menu de aprovações abrir e esconde as outras opções presentes no sistema.
//---------------------------------------------------------------------------------------------------------------------------------------------------                                                                                   
    

           if (requests_users) {
                requests_users.addEventListener('click', function(){
                    devolutions_users.style.opacity = '0.5';
                    requests_users.style.opacity = '1';
                    history.replaceState({}, "", "/request_approbation_menu");

                                                                                    //acima, se o usuário clicar na opção solicitações, o algoritmo direciona ele para as requisições presentes no banco de dados, e deixa a opção de devoluções (a saber, o que foi solicitado mas não é mais necessário), com opacidade em 50%.


                            fetch("/request_approbation_menu",{
                                method: "POST",
                                headers:{
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    Status: ""
                                })
                            })

                            .then(response => response.json())
                            .then(data =>{
                                
                                console.log("Resposta do servidor sobre as requisições: ", data)

                                requests = data
                                
                                const request_approved = requests[this.dataset.index]  
                                                                                    // acima o código trabalha com os dados em formato JSON recebidos via POST, ele recebe os dados do servidor e os guarda em "requests"



                                requests .forEach((p , index)=> {
                                let button_requests_user = document.createElement('input')
                            
                                button_requests_user.type ='button'
                                button_requests_user.className = 'usuario_solicitante';
                                button_requests_user.value = `Solicitação de: ${p.nome_solicitante}`
                                button_requests_user.setAttribute('data-nome',`${p.nome_solicitante}` )
                                button_requests_user.setAttribute('data-codigo',`${p.codigo_produto}` )
                                button_requests_user.setAttribute('data-tipo', 'requisicao');
                                button_requests_user.style.display = 'flex'
                                
                                button_requests_user.dataset.index=index

                                field_requests.appendChild(button_requests_user);

                                                                                        //acima foi feito a criação dinamica dos elementos, ou seja, ele procura o elemento no HTML com a class em questão e captura o primeiro elemento correspondente, com isso ele cria "cópias" do mesmo elemento segundo o numero de JSON.

                                
                                button_requests_user.addEventListener("click",function(){
                                    const request = requests[this.dataset.index]
                                    cell_name.textContent = request.nome_solicitante;
                                    cell_function_request.textContent = request.funcao_solicitante
                                    cell_product_request.textContent = request.descricao_produto
                                    cell_code_product_request.textContent = request.codigo_produto
                                    cell_descreption_quantity.textContent = request.quantidade_produto

                                                                                        //apos criar dinamicamente os botões e associa-los aos seus devidos JSONs, acima é feita a alteração dos valores, ou seja: Os dados dos JSONs são passados para a estrutura HTML tornando possivel a visualização do usuário, ao clicar, que no caso é o evento acima
                                    cell_name.style.display= "flex"
                                    cell_function_request.style.display = "flex"
                                    cell_product_request.style.display = "flex"
                                    cell_code_product_request.style.display = "flex"
                                    cell_descreption_quantity.style.display = "flex"
                                    
                                  
                                                                                        //apos o clique do usuário, ele torna visivel a tabela, juntamente com os dados que estão presentes nela
                                    requests_names.style.display = "flex"
                                    frame_table.style.display = "flex"
                                    table_acceptance.style.display = "flex"
                                    yes_or_no.style.display = "flex"
                                    
                                                                                        //apos o clique do usuário, ele torna visivel a tabela, juntamente com os dados que estão presentes nela
                                })

                                button_requests_user.addEventListener("dblclick",function(){
                                    requests_names.style.display = "none"
                                    frame_table.style.display = "none"
                                    table_acceptance.style.display = "none"
                                    yes_or_no.style.display = "none"

                                    cell_name.style.display= "none"
                                    cell_function_request.style.display = "none"
                                    cell_product_request.style.display = "none"
                                    cell_code_product_request.style.display = "none"
                                    cell_descreption_quantity.style.display = "none"
                                    

                                                                                        //acima é criado o evento de duplo clique, que tem por objetivo esconder os dados do usuário quando não for necessario aprovar naquele momento.
                                })
                                
                        })

                             
                                                                                        //a variavel acima, é  que vai enviar a requisição especifica que foi aprovada

                        accept_yes.addEventListener("click", function(){                //ao clicar em "APROVAR" ele faz o envio por metodo POST
                            const index = this.dataset.index
                            const request_approved = requests[index]
                            fetch("/request_approbation_menu",{
                                method: "POST",
                                headers:{
                                    'Content-Type': 'application/json',
                                },
                            

                                body: JSON.stringify({
                                    Status: "APROVADO",
                                    codigo_produto: request_approved.codigo_produto,
                                    descricao_produto: request_approved.descricao_produto,
                                    quantidade_produto: request_approved.quantidade_produto,
                                    nome_solicitante: request_approved.nome_solicitante,
                                    funcao_solicitante: request_approved.funcao_solicitante
                                })
                            })

                            .then(response => response.json())
                            .then(data =>{
                                confirm_mensage.style.display = 'flex';
                                acepttance_menu.style.display = 'none';
                                confirmed_descreption.textContent = "APROVAÇÃO CONCLUÍDA"

                                const approved_button_request = document.querySelector(`[data-nome="${request_approved.nome_solicitante}"][data-codigo="${request_approved.codigo_produto}"]`);
                                if (approved_button_request) {
                                    approved_button_request.remove();
                                }

                                setTimeout(()=>{
                                    confirm_mensage.style.display = 'none';
                                    uppermenu.style.display = 'none';
                                    acepttance_menu.style.display = 'block';
                                    confirmed_descreption.textContent = "CADASTRO REALIZADO"
                                }, 3000)
                           console.log("Envio aprovado dos dados:", data) })
                        })
                                                                            //acima temos o evento de aprovação da requisição. Ou seja, se o estoquista responsavel (ou quem tem acesso de estoquista) aprovar a liberação dos itens solicitados, o sistema enviará para o banco de dados a mesma requisição, mas dessa vez quem aprovou e com o status de APROVADO


                    })

                })
                       
                            no_accept.addEventListener("click", function(){

                                const index = this.dataset.index
                                const request_recused = requests[index]
                                fetch("/request_approbation_menu",{
                                    method: "POST",
                                    headers:{
                                        'Content-Type': 'application/json',
                                    },
                                
    
                                    body: JSON.stringify({
                                        Status: "RECUSADO",
                                        codigo_produto: request_recused.codigo_produto,
                                        descricao_produto: request_recused.descricao_produto,
                                        quantidade_produto: request_recused.quantidade_produto,
                                        nome_solicitante: request_recused.nome_solicitante,
                                        funcao_solicitante: request_recused.funcao_solicitante
                                    })
                                })
    
                                .then(response => response.json())
                                .then(data =>{
                                    denied_mensage.style.display = 'flex';
                                    acepttance_menu.style.display = 'none';
                                    confirmed_descreption.textContent = "SOLICITAÇÃO NEGADA"
    
                                    const recused_button_request = document.querySelector(`[data-nome="${request_recused.nome_solicitante}"][data-codigo="${request_recused.codigo_produto}"]`);
                                    if (recused_button_request) {
                                        recused_button_request.remove();
                                    }
    
                                    setTimeout(()=>{
                                        denied_mensage.style.display = 'none';
                                        uppermenu.style.display = 'none';
                                        acepttance_menu.style.display = 'block';
                                        confirmed_descreption.textContent = "CADASTRO REALIZADO"
                                    }, 3000)
                                    console.log("Envio aprovado dos dados recusados:", data) })
                                })


                        
                                                                        //acima temos o evento de reprovação da requisição. Ou seja, se o estoquista responsavel (ou quem tem acesso de estoquista) recusar a liberação dos itens solicitados, o sistema enviará para o banco de dados a mesma requisição, mas dessa vez quem reprovou e com o status de RECUSADO.
    
    
               
           };

//---------------------------------------------------------------------------------------------------------------------------------------------   
    
           if (devolutions_users) 
                devolutions_users.addEventListener('click', function(){
                history.replaceState({}, "", "/request_devolution_approbation_menu");

                devolutions_users.style.opacity = '1'
                requests_users.style.opacity = '0.5'
                requests_names.style.display = 'flex';

                fetch("/request_devolution_approbation_menu", {
                    method: "POST",
                    headers:{
                        'Content-type': 'application/json',
                    },
                    
                    body:JSON.stringify({
                        Status: "APROVADO",  
                    })
                })

                .then(response => response.json())
                .then(data =>{
                    console.log('dados recebidos para devolução:', data)
                    requests_devolutions = data;
                    
                requests_devolutions .forEach((p , index)=> {
                                let button_devolutions_user = document.createElement('input')
 
                                button_devolutions_user.type ='button'
                                button_devolutions_user.className = 'usuario_solicitante';
                                button_devolutions_user.value = `Solicitação de: ${p.nome_solicitante}`
                                button_devolutions_user.setAttribute('data-nome',`${p.nome_solicitante}` )
                                button_devolutions_user.setAttribute('data-codigo',`${p.codigo_produto}` )
                                button_devolutions_user.setAttribute('data-tipo', 'devolucao')
                                button_devolutions_user.style.display = 'flex'

                                button_devolutions_user.dataset.index=index

                                field_requests.appendChild(button_devolutions_user);

                                                                                        //acima foi feito a criação dinamica dos elementos, ou seja, ele procura o elemento no HTML com a class em questão e captura o primeiro elemento correspondente, com isso ele cria "cópias" do mesmo elemento segundo o numero de JSON.

                                 button_devolutions_user.addEventListener("click", function () {

                                    const devolucao = requests_devolutions[this.dataset.index];
                                    
                                    cell_name.textContent = devolucao.nome_solicitante;
                                    cell_function_request.textContent = devolucao.funcao_solicitante;
                                    cell_product_request.textContent = devolucao.descricao_produto;
                                    cell_code_product_request.textContent = devolucao.codigo_produto;
                                    cell_descreption_quantity.textContent = devolucao.quantidade_produto;

                                    accept_yes.dataset.index = this.dataset.index;
                                    no_accept.dataset.index = this.dataset.index;

                                    cell_name.style.display = "flex";
                                    cell_function_request.style.display = "flex";
                                    cell_product_request.style.display = "flex";
                                    cell_code_product_request.style.display = "flex";
                                    cell_descreption_quantity.style.display = "flex";
                                    
                                    requests_names.style.display = "flex";
                                    frame_table.style.display = "flex";
                                    table_acceptance.style.display = "flex";
                                    yes_or_no.style.display = "flex";
                                });

                })

                                                                                     //acima o sistema acessa ao submenu de devoluções(aquilo que foi aprovado, não é mais necessário e deve ser reestocado), ele cria os botões de modo dinamico, de acordo com o número de JSON retornados pelo back e ao clicar nos botões, ele exibe os dados.

                if (accept_yes){
                    accept_yes.addEventListener("click", function(){

                        const index_return = this.dataset.index

                        const devolution_approved = requests_devolutions[index_return]

                        fetch("/request_devolution_approbation_menu", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },

                            body: JSON.stringify({
                                Status: "APROVADO_REESTOQUE",
                                codigo_produto: devolution_approved.codigo_produto,
                                    descricao_produto: devolution_approved.descricao_produto,
                                    quantidade_produto: devolution_approved.quantidade_produto,
                                    nome_solicitante: devolution_approved.nome_solicitante,
                                    funcao_solicitante: devolution_approved.funcao_solicitante
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            console.log("Devolução aprovada dos seguintes produtos: ", data)


                            const approved_button_devolution = document.querySelector(`[data-nome="${devolution_approved.nome_solicitante}"][data-codigo="${devolution_approved.codigo_produto}"]`);


                            if (approved_button_devolution) {
                                approved_button_devolution.remove();
                            }

                             confirm_mensage.style.display = 'flex';
                                acepttance_menu.style.display = 'none';
                                confirmed_descreption.textContent = "APROVAÇÃO CONCLUÍDA"
                                setTimeout(()=>{
                                    confirm_mensage.style.display = 'none';
                                    uppermenu.style.display = 'none';
                                    acepttance_menu.style.display = 'block';
                                    confirmed_descreption.textContent = "CADASTRO REALIZADO"
                                }, 3000)
                        })
                       
                    })
                }                                       

                                                                                      // acima o sistema aprova a solicitação de devolução, ele pega a devolução de acordo com o index e aprova de acordo com o desejo do usuário, e apos a aprovação ele remove da tela o que foi aprovado.


                if (no_accept){
                    no_accept.addEventListener("click", function(){
                        denied_mensage.style.display = 'flex';
                        acepttance_menu.style.display = 'none';
                        setTimeout(()=>{
                            denied_mensage.style.display = 'none';
                            uppermenu.style.display = 'none';
                            acepttance_menu.style.display = 'block';
                        }, 3000)
                    })
                }
    
                });
    
            });
    
        }
    )
    close_windows("acceptance_menu")
    }
}
//=============================FIM DA FUNÇÃO=========================================================================  

//================ adicionando a função ao botão de solicitações ================================================

function SetupDevolution(){
    const new_devolution = document.getElementById("devolutions_btn");
    const devolutions_menu = document.getElementById ("devolutions_menu")
    const query_data_base_devolution_form = document.getElementById ("query_data_base_devolution_form")
    const table_devolution_structure = document.querySelector(".descrição_pesquisa_de_produtos")
    const container_resultados = document.getElementById("container_resultados")
    const devol_products_button = document.getElementById ("devol_products_button")
    let requests_for_devolution = []
                                                                                // acima temos as variaveis que fazem parte desse menu do sistema.


    if (new_devolution) {
        new_devolution.addEventListener('click', function() {
            devolutions_menu.style.display = 'block';  
            uppermenu.style.display = 'none';
            history.replaceState({}, "", "/request_devolution_menu");

            const request_approved = requests_for_devolution[this.dataset.index];  
                                                                                //acima temos o seguinte acontecimento: ao clicar no botão de abrir o menu de devoluções o sistema esconde o menu principal e exibe a funcionalidade de devolução e altera a URL para a funcionalidade correspondente.


            query_data_base_devolution_form.addEventListener("submit", function(e){
                e.preventDefault();

                const word_search = e.target.search_field_devolution.value

                fetch('/request_devolution_menu',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({search: word_search})
                })
                                                                                //acima temos a conexão com o back-end, ele envia para o back o que o usuário digitou como pesquisa e pede o retorno dos resultados. Abaixo no .then ele espera uma resposta JSON e cria dinamicamente a tabela contendo os resultados,
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                    let table_result_for_devolution = ''

                    data.forEach((p,index) => {

                        table_result_for_devolution += 
                            
                            `   
                                <tr class="resultados_pesquisa_de_produtos">
                                    <td class="codigo_resultado"> ${p.codigo_produto} </td>
                                    <td class="descrição_resultado"> ${p.descricao_produto} </td>
                                    <td class="quantidade_disponivel"> ${p.quantidade_produto} </td>
                                    <td > 
                                       <input type="checkbox" class="selecionar_esse"
                                            data-codigo="${p.codigo_produto}_${index}" 
                                            data-descricao="${p.descricao_produto}" 
                                            data-quantidade="${p.quantidade_produto}" >
                                    </td>
                                </tr>
                            `    
                        })
                    
                            
                            container_resultados.innerHTML = table_result_for_devolution;
                            devol_products_button.style.display = "flex"
                            table_devolution_structure.style.display = "flex"
            
                                                                                 //acima o código recebe a resposta do sistema, cria dinamicamente as linhas e elementos da tabela conforme a quantidade de elementos que vieram do back.

                                                                        
                            document.querySelectorAll(".selecionar_esse").forEach(cb => {
                                cb.addEventListener('change', () => {
                                    const cod = cb.dataset.codigo;
                                    const descricao = cb.dataset.descricao;
                                    const quantidade = parseInt(cb.dataset.quantidade) ;
                            
                                    if (!cod || !descricao || !quantidade) return;
                            
                                    if (cb.checked) {
                                        if (!requests_for_devolution.some(item => item.codigo === cod)) {
                                            requests_for_devolution.push({
                                                codigo: cod,
                                                descricao: descricao,
                                                quantidade: quantidade
                                            });
                                        }
                                    } else {
                                        requests_for_devolution = requests_for_devolution.filter(item => item.codigo !== cod);
                                    }
                                                                         //acima temos o evento de captura dos checkboxes. Ele seleciona todos e captura assim que são clicados, quando a captura acontece ele verifica se já foi incluido antes ou não, se não ele adiciona ao array "requests_for_devolution" se for desmarcado ele retira do array.

                                    devol_products_button.disabled = requests_for_devolution.length === 0;
                                    devol_products_button.value = requests_for_devolution.length > 0
                                        ? `devolver (${requests_for_devolution.length})`
                                        : 'devolver';

                                    console.log('Selecionados:', requests_for_devolution);

                                                                            //acima temos a atualização do botão dinamicamente, ao clicar no produto que deseja devolver (será sempre devolvido de forma integral, pois partiu-se do principio que ele só foi retirado do estoque na devida quantidade para atender uma solicitação especifica) a quantidade do botão muda automaticamente e pode ser visto no console o que foi selecionado para voltar ao estoque.
                                });
                            });

                        })
                    })
                })
      
            if (devol_products_button) {
                devol_products_button.addEventListener('click', function() {

                    fetch("/request_devolution_approbation_menu", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({devolutions: requests_for_devolution,
                                                Status: "REESTOCAR",
                                                
                            })
                    })
                                                                            //ao clicar em "devolver(X)" o sistema cria a conexão com o banco de dados para enviar os dados dos produtos para o estoque.
                        .then(response => response.json())
                        .then(data => {
                            console.log("Resposta do backend:", data);
                        })

                        
                        devolutions_menu.style.display = 'none';   
                        confirm_mensage.style.display = 'flex'; 
                        confirmed_descreption.textContent = "DEVOLUÇÃO CONCLUÍDA"   
                        console.log("Devolução enviada");
        
                        setTimeout(() => {
                            confirm_mensage.style.display = 'none';  
                            uppermenu.style.display = 'flex';     
                            confirmed_descreption.textContent = "CADASTRO REALIZADO"   
                        }, 3000);
                    });
            }
        };
        close_windows("devolutions_menu")
    }
   


//=============================FIM DA FUNÇÃO=========================================================================  


//================ adicionando a função ao botão de registros ================================================

function SetupHistoric(query_historic, registration_tab, record_tab_product,solicitation_tab,selected_option){
    if (query_historic){
        query_historic.addEventListener("click",function(){
            historic_menu.style.display = "block",
            uppermenu.style.display = 'none';      
        })
    
        //aqui quando o usuário apertar o botão de registros E escolher a opção cadastramento, aparecerá duas opções: 1-produtos e 2- funcionários:
    
        if (registration_tab){
            registration_tab.addEventListener("click", function(){
                record_tab_product.style.display = "block"
                record_tab_worker.style.display = "block"
            })
        }
                    if(registration_tab){//aqui é a função de duplo clique para esconder as opções
                        registration_tab.addEventListener("dblclick",function(){
                        record_tab_product.style.display = "none"
                        record_tab_worker.style.display = "none"
                        })
                    }

                //aqui o usuário vai acompanhar a ficha dos registros dos produtos, isso de cada produto separadamente, já que é a primeira opção: 
    
                if (record_tab_product){
                    record_tab_product.addEventListener("click", function(){
                        record_product.style.display = "block"
                        document.getElementById("blur-overlay").style.display  = "block"
                        close_sub_windows("record_product")

                    })
                }
    
                //aqui o usuário vai acompanhar a ficha dos registros dos funcionários, isso de cada funcionário separadamente, já que é a segunda opção: 
    
    
                if (record_tab_worker){
                    record_tab_worker.addEventListener("click", function(){
                        record_worker.style.display = "block"
                        document.getElementById("blur-overlay").style.display  = "block"
                        close_sub_windows("record_worker")  
                    })
                }
        }
        //---------------------------------------------------------------------------------------------------


        //aqui está a lógica para pesquisar os registros das aprovações:
        if(solicitation_tab){
            solicitation_tab.addEventListener("click",function(){
                choice_search_request.style.display = "flex"
            })
        }
                if(solicitation_tab){//aqui é a função de duplo clique para esconder as opções
                    solicitation_tab.addEventListener("dblclick",function(){
                        data_collect_consult_request.style.display = "none"
                        choice_search_request.style.display = "none"
                        table_requests_registers.style.display = "none"
                    })
                }

            //acima o usuário escolhe o tipo de pesquisa: por Id de funcionário ou por código de produto; abaixo ele digita o dado escolhido por ele:
            if(selected_option){
                selected_option.addEventListener("click", function(){
                    data_collect_consult_request.style.display = "flex" 
                })
            }

            [...search_options].forEach(radio => {
                radio.addEventListener("click", function() {
                    data_collect_consult_request.style.display = "flex";
                      if (radio.value === "codigo") { // Exemplo com valor do radio
                        alternate_content.textContent = "Informe o código do produto:"

                    }
                    if (radio.value === "ID") { // Outro exemplo com valor do radio
                        alternate_content.textContent = "Informe o ID do solicitante:";
                    }
                });

                    if(button_search_register){
                        button_search_register.addEventListener("click",function(){
                            document.getElementById("blur-overlay").style.display  = "flex"
                            table_requests_registers.style.display = "flex"
                            backdoor_table_request.style.display = "flex"
                            close_sub_windows("backdoor_table_request")
    
                        })
                    }

                });

            //---------------------------------------------------------------------------------------------------

            //aqui vamos ter a exibição dos registros de aprovação, funcionarão de modo semelhante a das solicitações:

            if(approval_tab_register){
                approval_tab_register.addEventListener("click",function(){
                    choice_search_approval.style.display = "flex"
                })
            }

           

                    if(choice_search_approval){
                        choice_search_approval.addEventListener("click", function(){
                            choice_search_approval.style.display = "flex"
                        })
                    }

                    [...search_options_approval].forEach(radio=> {
                        radio.addEventListener("click", function() {
                            data_collect_consult_approval.style.display = "flex";
                              if (radio.id === "search_by_code_aprov") {
                                alternate_content_approval.textContent = "Informe o código do produto:"
        
                            }
                            if (radio.id === "search_by_Id_aprov") { 
                                alternate_content_approval.textContent = "Informe o ID do aprovador:";
                            }
                        });

                        if(button_search_approval){
                            button_search_approval.addEventListener("click",function(){
                                document.getElementById("blur-overlay").style.display  = "flex"
                                table_approval_registers.style.display = "flex"
                                backdoor_table_approval.style.display = "flex"
                                close_sub_windows("backdoor_table_approval")
                            })
                        }
                    })

                    if(approval_tab_register){//aqui é a função de duplo clique para esconder as opções
                        approval_tab_register.addEventListener("dblclick",function(){
                        choice_search_approval.style.display = "none"
                        data_collect_consult_approval.style.display = "none"
        
                        })
                    }

            //---------------------------------------------------------------------------------------------------

            //aqui vamos ter a exibição dos registros de devolução, funcionarão de modo semelhante a das solicitações e aprovações:

            if(devolution_tab_register){
                devolution_tab_register.addEventListener("click",function(){
                    choice_search_devolution.style.display = "flex"
                })
            }

            [...search_options_devolution].forEach(radio => {
                radio.addEventListener("click", function() {
                    data_collect_consult_devolution.style.display = "flex";
                      if (radio.id === "search_by_code_devolution") { // Exemplo com valor do radio
                        alternate_content_devolution.textContent = "Informe o código do produto:"

                    }
                    if (radio.id === "search_by_id_devolution") { // Outro exemplo com valor do radio
                        alternate_content_devolution.textContent = "Informe o ID do devolvente:";
                    }
                });

                    if(button_search_devolutions){
                        button_search_devolutions.addEventListener("click",function(){
                            document.getElementById("blur-overlay").style.display  = "flex"
                            table_devolution_registers.style.display = "flex"
                            backdoor_table_devolution.style.display = "flex"
                            close_sub_windows("backdoor_table_devolution")
                        })
                    }

                });


                if(devolution_tab_register){//aqui é a função de duplo clique para esconder as opções
                    devolution_tab_register.addEventListener("dblclick",function(){
                    choice_search_devolution.style.display = "none"
                    data_collect_consult_devolution.style.display = "none"
                    table_devolution_registers.style.display = "none"
    
                    })
                }


                //---------------------------------------------------------------------------------------------------

                //aqui vamos ter a exibição dos registros de aprovação, funcionarão de modo semelhante a das solicitações e os registros anteriores:

                if(inventory_tab_register){
                    inventory_tab_register.addEventListener("click",function(){
                        choice_search_inventory.style.display="flex"
                    })
                }

                [...search_options_inventory].forEach(radio => {
                    radio.addEventListener("click", function() {
                        data_collect_consult_inventory.style.display = "flex";
                          if (radio.id === "search_by_code_inventory") {
                            alternate_content_inventory.textContent = "Informe o código do produto inventariado:"
    
                        }
                        if (radio.id === "search_by_id_inventory") { 
                            alternate_content_inventory.textContent = "Informe o ID do inventariador:";
                        }
                    });
    
                        if(button_search_register_inventory){
                            button_search_register_inventory.addEventListener("click",function(){
                                document.getElementById("blur-overlay").style.display  = "flex"
                                table_inventory_registers.style.display = "flex"
                                backdoor_table_inventory.style.display = "flex"
                                close_sub_windows("backdoor_table_inventory")
                            })
                        }
    
                    });




                    if(inventory_tab_register){//aqui é a função de duplo clique para esconder as opções
                        inventory_tab_register.addEventListener("dblclick",function(){
                        choice_search_inventory.style.display = "none"
                        data_collect_consult_inventory.style.display = "none"
                        })
                    }

    close_windows ("historic_menu")
}

//=============================FIM DA FUNÇÃO=========================================================================  

//=========================== adicionando a função ao botão de inventário ================================================

function SetupInventory(query_inventory,inventory_menu){
    if(query_inventory){
        query_inventory.addEventListener("click", function(){
            inventory_menu.style.display = "block"
            uppermenu.style.display = "none"
        })
    }

        if(button_alter_inventory){
            button_alter_inventory.addEventListener('click', function (){
            inventory_menu.style.display = 'none';
            confirm_mensage.style.display = 'flex';
            confirmed_descreption.textContent = "INVENTÁRIO REALIZADO"
                setTimeout(()=>{
                    confirm_mensage.style.display = 'none';
                    uppermenu.style.display = 'flex';
                    confirmed_descreption.textContent = "CADASTRO REALIZADO"
                }, 3000)

            });
    }
    close_windows("inventory_menu")
}

//===============================FIM DA FUNÇÃO=========================================================================  

//=================================== bloco de funções ================================================================

SetupRegister(new_register, new_worker, new_product, button_register_worker, button_register_products, confirm_mensage)
SetupRequest(new_request, query_product_data_base_form, table_products, select_products_btn, confirm_mensage)
SetupAceppt()
SetupDevolution()
SetupHistoric(query_historic, registration_tab, record_tab_product,solicitation_tab,selected_option)
SetupInventory(query_inventory,inventory_menu)