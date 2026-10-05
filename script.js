document.addEventListener('DOMContentLoaded', () => {

    // ======================================================
    // 1. CONFIGURAÇÃO DO SUPABASE
    // ======================================================

    const SUPABASE_URL = "https://nelbggmhpohkouhcdtqc.supabase.co";

    const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_5lyMb_65EuVfr10t5gqr9A_KXZOGFPp";

    const supabaseClient = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );

    console.log("✅ Supabase conectado!");


    // ======================================================
    // 2. PRELOADER / INTRO
    // ======================================================

    const preloader = document.getElementById('preloader');
    const logoIntro = document.getElementById('logo-intro');
    const textIntro = document.getElementById('text-intro');
    const progressBar = document.querySelector('.loader-progress');
    const loaderBar = document.querySelector('.loader-bar');
    const btnExplore = document.getElementById('btn-explore');

    if (
        preloader &&
        logoIntro &&
        textIntro &&
        progressBar &&
        loaderBar &&
        btnExplore
    ) {

        let progress = 0;

        const interval = setInterval(() => {

            progress += 20;

            progressBar.style.width = `${progress}%`;

            if (progress >= 100) {

                clearInterval(interval);

                setTimeout(() => {

                    logoIntro.style.display = 'none';

                    loaderBar.style.display = 'none';

                    textIntro.style.display = 'block';

                    btnExplore.style.display = 'inline-flex';

                }, 400);
            }

        }, 200);


        btnExplore.addEventListener('click', () => {

            preloader.style.opacity = '0';

            preloader.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {

                preloader.style.display = 'none';

                initCounters();

            }, 500);

        });

    }


    // ======================================================
    // 3. HEADER / MENU MOBILE
    // ======================================================

    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    window.addEventListener('scroll', () => {

        if (header) {

            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

        }


        const backToTop =
            document.getElementById('back-to-top');

        if (backToTop) {

            if (window.scrollY > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }

        }

    });


    if (hamburger && navMenu) {

        hamburger.addEventListener('click', () => {

            navMenu.classList.toggle('active');

        });

    }


    // Fechar menu ao clicar em um link

    document.querySelectorAll('.nav-link').forEach(link => {

        link.addEventListener('click', () => {

            if (navMenu) {
                navMenu.classList.remove('active');
            }

        });

    });


    // ======================================================
    // 4. CURSOR PERSONALIZADO
    // ======================================================

    const cursor =
        document.querySelector('.custom-cursor');

    const follower =
        document.querySelector('.custom-cursor-follower');


    if (
        window.innerWidth > 768 &&
        cursor &&
        follower
    ) {

        document.addEventListener('mousemove', (e) => {

            cursor.style.transform =
                `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;

            follower.style.transform =
                `translate3d(${e.clientX - 11}px, ${e.clientY - 11}px, 0)`;

        });

    }


    // ======================================================
    // 5. FILTRO DE PROJETOS
    // ======================================================

    const filterBtns =
        document.querySelectorAll('.filter-btn');

    const projectCards =
        document.querySelectorAll('.project-card');


    filterBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            filterBtns.forEach(b => {
                b.classList.remove('active');
            });

            btn.classList.add('active');


            const filter =
                btn.getAttribute('data-filter');


            projectCards.forEach(card => {

                const category =
                    card.getAttribute('data-category');


                if (
                    filter === 'todos' ||
                    category === filter
                ) {

                    card.style.display = 'block';

                } else {

                    card.style.display = 'none';

                }

            });

        });

    });


    // ======================================================
    // 6. CONTADORES ANIMADOS
    // ======================================================

    function initCounters() {

        const counters =
            document.querySelectorAll('.counter');


        counters.forEach(counter => {

            const target =
                Number(counter.getAttribute('data-target'));

            let count = 0;


            const updateCount = () => {

                if (count < target) {

                    count++;

                    counter.innerText = count;

                    setTimeout(updateCount, 200);

                } else {

                    counter.innerText = target;

                }

            };


            updateCount();

        });

    }


    // ======================================================
    // 7. FORMULÁRIO DE CONTATO + SUPABASE
    // ======================================================

    const form =
        document.getElementById('contact-form');

    const formStatus =
        document.getElementById('form-status');


    if (form && formStatus) {

        form.addEventListener('submit', async (e) => {

            e.preventDefault();


            const name =
                document.getElementById('name')?.value.trim();

            const email =
                document.getElementById('email')?.value.trim();

            const message =
                document.getElementById('message')?.value.trim();


            // Verificação

            if (!name || !email || !message) {

                formStatus.style.color = '#ff5f56';

                formStatus.innerText =
                    'Por favor, preencha todos os campos.';

                return;

            }


            // Mensagem de carregamento

            formStatus.style.color = '#C6A45C';

            formStatus.innerText =
                'Enviando mensagem...';


            try {

                // Enviar para o Supabase

                const { error } =
                    await supabaseClient
                        .from('mensagens')
                        .insert([
                            {
                                nome: name,
                                email: email,
                                mensagem: message
                            }
                        ]);


                // Verificar erro

                if (error) {

                    console.error(
                        'Erro ao enviar:',
                        error
                    );

                    formStatus.style.color =
                        '#ff5f56';

                    formStatus.innerText =
                        'Não foi possível enviar a mensagem.';

                    return;

                }


                // Sucesso

                formStatus.style.color =
                    '#00ff88';

                formStatus.innerText =
                    'Mensagem enviada com sucesso! Obrigado pelo contato.';


                form.reset();


            } catch (error) {

                console.error(
                    'Erro inesperado:',
                    error
                );

                formStatus.style.color =
                    '#ff5f56';

                formStatus.innerText =
                    'Ocorreu um erro. Tente novamente.';

            }

        });

    }


    // ======================================================
    // 8. BOTÃO VOLTAR AO TOPO
    // ======================================================

    const backToTop =
        document.getElementById('back-to-top');


    if (backToTop) {

        backToTop.addEventListener('click', () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        });

    }


    // ======================================================
    // 9. ATUALIZAÇÃO DO ANO
    // ======================================================

    const year =
        document.getElementById('year');


    if (year) {

        year.innerText =
            new Date().getFullYear();

    }

});