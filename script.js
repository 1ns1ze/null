document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.navbar a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.navbar a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
});
