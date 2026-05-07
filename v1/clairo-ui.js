(function () {
        const THEMES = {
                'dark-orange': {
                        html: 'dark',
                        swBg: '#252525',
                        swBorder: '#7b5044',
                        swLabel: '#d8d5d3',
                        c: { "primary": "#ffc0ad", "primary-fixed-dim": "#ffc0ad", "primary-fixed": "#ffe1d7", "primary-container": "#ff6a2a", "on-primary": "#5a1400", "on-primary-container": "#481000", "on-primary-fixed": "#381000", "outline-variant": "#7b5044", "outline": "#c0978d", "surface-container-high": "#343434", "surface-container-highest": "#414141", "surface-container-low": "#252626", "surface-container-lowest": "#1c1c1c", "surface-container": "#2a2b2b", "surface": "#202020", "surface-bright": "#444444", "surface-variant": "#3c3c3c", "background": "#202020", "on-background": "#f0eeed", "on-surface": "#f0eeed", "on-surface-variant": "#f0c9bd", "secondary": "#d8d5d3", "secondary-container": "#565250", "secondary-fixed": "#eee9e7", "on-secondary": "#313030", "on-secondary-container": "#d3cecc", "on-secondary-fixed": "#1c1b1b", "tertiary": "#d4d4d5", "tertiary-container": "#a2a3a3", "tertiary-fixed": "#eeeeee", "on-tertiary": "#2f3131", "on-tertiary-container": "#282a2a", "on-tertiary-fixed": "#1a1c1c", "inverse-surface": "#eeeeed", "inverse-on-surface": "#303030", "inverse-primary": "#b63a04", "error": "#ffb4ab", "error-container": "#93000a", "on-error": "#690005", "on-error-container": "#ffdad6" }
                },
                'light-orange': {
                        html: 'light',
                        swBg: '#fff7f3',
                        swBorder: '#f0c4b0',
                        swLabel: '#7a3010',
                        c: { "primary": "#c84d00", "primary-fixed-dim": "#e85800", "primary-fixed": "#ffe4d8", "primary-container": "#ff9a70", "on-primary": "#ffffff", "on-primary-container": "#4a1200", "on-primary-fixed": "#3a0a00", "outline-variant": "#efc8b8", "outline": "#cf7f5a", "surface-container-high": "#f7e9e3", "surface-container-highest": "#f0ded6", "surface-container-low": "#fff9f6", "surface-container-lowest": "#ffffff", "surface-container": "#fbf0ec", "surface": "#ffffff", "surface-bright": "#ffffff", "surface-variant": "#f5e8e2", "background": "#fff7f3", "on-background": "#25160e", "on-surface": "#25160e", "on-surface-variant": "#5e3524", "secondary": "#6b4030", "secondary-container": "#ffddd0", "secondary-fixed": "#ffddd0", "on-secondary": "#ffffff", "on-secondary-container": "#3b1206", "on-secondary-fixed": "#3b1206", "tertiary": "#5c5a00", "tertiary-container": "#e8e56a", "tertiary-fixed": "#f5f28c", "on-tertiary": "#ffffff", "on-tertiary-container": "#1c1a00", "on-tertiary-fixed": "#1c1a00", "inverse-surface": "#3a2518", "inverse-on-surface": "#ffede5", "inverse-primary": "#ffb59f", "error": "#ba1a1a", "error-container": "#ffdad6", "on-error": "#ffffff", "on-error-container": "#410002" }
                },
                'lime-green': {
                        html: 'light',
                        swBg: '#f4ffed',
                        swBorder: '#acd99c',
                        swLabel: '#1d4d12',
                        c: { "primary": "#2f7d20", "primary-fixed-dim": "#65c943", "primary-fixed": "#d8f8c8", "primary-container": "#88df68", "on-primary": "#ffffff", "on-primary-container": "#0a3600", "on-primary-fixed": "#0a3600", "outline-variant": "#b9dcae", "outline": "#70b959", "surface-container-high": "#e3f6dd", "surface-container-highest": "#d7efcf", "surface-container-low": "#f8fff5", "surface-container-lowest": "#ffffff", "surface-container": "#effae9", "surface": "#ffffff", "surface-bright": "#ffffff", "surface-variant": "#e3f6dd", "background": "#f4ffed", "on-background": "#0e2208", "on-surface": "#0e2208", "on-surface-variant": "#2a4c22", "secondary": "#3a6030", "secondary-container": "#c8eab8", "secondary-fixed": "#c8eab8", "on-secondary": "#ffffff", "on-secondary-container": "#0e2208", "on-secondary-fixed": "#0e2208", "tertiary": "#005f7a", "tertiary-container": "#b0e4f5", "tertiary-fixed": "#cceeff", "on-tertiary": "#ffffff", "on-tertiary-container": "#001f2a", "on-tertiary-fixed": "#001f2a", "inverse-surface": "#1a3014", "inverse-on-surface": "#e4f5dc", "inverse-primary": "#a0e888", "error": "#ba1a1a", "error-container": "#ffdad6", "on-error": "#ffffff", "on-error-container": "#410002" }
                },
                'navy-blue': {
                        html: 'dark',
                        swBg: '#0b1728',
                        swBorder: '#24436b',
                        swLabel: '#9fc7ec',
                        c: { "primary": "#9fd0ff", "primary-fixed-dim": "#68b0ef", "primary-fixed": "#d4ebff", "primary-container": "#2368a8", "on-primary": "#00264a", "on-primary-container": "#d8edff", "on-primary-fixed": "#00264a", "outline-variant": "#24436b", "outline": "#4d7eb3", "surface-container-high": "#19283d", "surface-container-highest": "#22354d", "surface-container-low": "#101d2c", "surface-container-lowest": "#08111d", "surface-container": "#142338", "surface": "#0b1728", "surface-bright": "#23354b", "surface-variant": "#22354d", "background": "#0b1728", "on-background": "#d8e8f8", "on-surface": "#d8e8f8", "on-surface-variant": "#accdea", "secondary": "#a8c3df", "secondary-container": "#1f3758", "secondary-fixed": "#d1e4fb", "on-secondary": "#001a2e", "on-secondary-container": "#c2dcf7", "on-secondary-fixed": "#001a2e", "tertiary": "#bddcff", "tertiary-container": "#315475", "tertiary-fixed": "#ddecff", "on-tertiary": "#00243e", "on-tertiary-container": "#d0e7ff", "on-tertiary-fixed": "#00243e", "inverse-surface": "#d8e8f8", "inverse-on-surface": "#0a1a2c", "inverse-primary": "#0050a0", "error": "#ffb4ab", "error-container": "#93000a", "on-error": "#690005", "on-error-container": "#ffdad6" }
                }
        };

        function ensureSwitcher() {
                if (document.getElementById('theme-switcher')) return;
                const switcher = document.createElement('div');
                switcher.id = 'theme-switcher';
                switcher.innerHTML = '<label>Theme</label><button class="theme-btn" data-theme="dark-orange" title="Dark Orange"></button><button class="theme-btn" data-theme="light-orange" title="Light Orange"></button><button class="theme-btn" data-theme="lime-green" title="Lime Green"></button><button class="theme-btn" data-theme="navy-blue" title="Navy Blue"></button>';
                document.body.appendChild(switcher);
        }

        window.applyTheme = function (name) {
                const theme = THEMES[name] || THEMES['dark-orange'];
                try { localStorage.setItem('clairo-theme', name); } catch (e) { }
                document.documentElement.className = theme.html;
                const sw = document.getElementById('theme-switcher');
                if (sw) {
                        sw.style.background = theme.swBg;
                        sw.style.borderColor = theme.swBorder;
                        const lbl = sw.querySelector('label');
                        if (lbl) lbl.style.color = theme.swLabel;
                }
                document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.theme === name));
                let st = document.getElementById('clairo-theme-vars');
                if (!st) { st = document.createElement('style'); st.id = 'clairo-theme-vars'; document.head.appendChild(st); }
                const c = theme.c;
                st.textContent = `.bg-background{background-color:${c['background']}!important}.bg-surface{background-color:${c['surface']}!important}.bg-surface-container{background-color:${c['surface-container']}!important}.bg-surface-container-low{background-color:${c['surface-container-low']}!important}.bg-surface-container-lowest{background-color:${c['surface-container-lowest']}!important}.bg-surface-container-high{background-color:${c['surface-container-high']}!important}.bg-surface-container-highest{background-color:${c['surface-container-highest']}!important}.bg-surface-variant{background-color:${c['surface-variant']}!important}.bg-primary{background-color:${c['primary']}!important}.bg-primary-container{background-color:${c['primary-container']}!important}.bg-primary-fixed{background-color:${c['primary-fixed']}!important}.bg-secondary-container{background-color:${c['secondary-container']}!important}.bg-tertiary-container{background-color:${c['tertiary-container']}!important}.bg-tertiary-fixed{background-color:${c['tertiary-fixed']}!important}.bg-inverse-surface{background-color:${c['inverse-surface']}!important}.bg-error-container{background-color:${c['error-container']}!important}.text-on-background{color:${c['on-background']}!important}.text-on-surface{color:${c['on-surface']}!important}.text-on-surface-variant{color:${c['on-surface-variant']}!important}.text-on-primary{color:${c['on-primary']}!important}.text-on-primary-container{color:${c['on-primary-container']}!important}.text-on-primary-fixed{color:${c['on-primary-fixed']}!important}.text-on-secondary{color:${c['on-secondary']}!important}.text-on-tertiary-container{color:${c['on-tertiary-container']}!important}.text-on-tertiary-fixed{color:${c['on-tertiary-fixed']}!important}.text-primary{color:${c['primary']}!important}.text-primary-container{color:${c['primary-container']}!important}.text-primary-fixed-dim{color:${c['primary-fixed-dim']}!important}.text-secondary{color:${c['secondary']}!important}.text-tertiary{color:${c['tertiary']}!important}.text-surface-bright{color:${c['surface-bright']}!important}.text-secondary-fixed{color:${c['secondary-fixed']}!important}.text-inverse-on-surface{color:${c['inverse-on-surface']}!important}.text-error{color:${c['error']}!important}.border-outline-variant{border-color:${c['outline-variant']}!important}.border-outline{border-color:${c['outline']}!important}.border-primary{border-color:${c['primary']}!important}.border-primary-container{border-color:${c['primary-container']}!important}.hover\\:bg-primary:hover{background-color:${c['primary']}!important}.hover\\:bg-primary-container:hover{background-color:${c['primary-container']}!important}.hover\\:bg-surface-container-high:hover{background-color:${c['surface-container-high']}!important}.hover\\:bg-surface-container-highest:hover{background-color:${c['surface-container-highest']}!important}.hover\\:border-primary:hover{border-color:${c['primary']}!important}.hover\\:text-primary:hover{color:${c['primary']}!important}.hover\\:text-on-background:hover{color:${c['on-background']}!important}.group:hover .group-hover\\:text-primary{color:${c['primary']}!important}body{background-color:${c['background']}!important;color:${c['on-background']}!important}#theme-switcher{background:${theme.swBg}!important;border-color:${theme.swBorder}!important}`;
        };

        function init() {
                ensureSwitcher();
                document.querySelectorAll('.theme-btn').forEach(btn => btn.addEventListener('click', () => window.applyTheme(btn.dataset.theme)));
                let selected = 'dark-orange';
                try { selected = localStorage.getItem('clairo-theme') || selected; } catch (e) { }
                window.applyTheme(selected);
        }

        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
        else init();
})();
