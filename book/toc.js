// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="intro.html"><strong aria-hidden="true">1.</strong> 简介</a></li><li class="chapter-item expanded "><a href="chapter_1.html"><strong aria-hidden="true">2.</strong> 第一章</a></li><li class="chapter-item expanded affix "><li class="part-title">简介 | Intro | プロフ | préface</li><li class="chapter-item expanded affix "><li class="part-title">博客阅读指南 | Blog Reading Guide</li><li class="chapter-item expanded "><a href="blog-reading.html"><strong aria-hidden="true">3.</strong> 3. 博客阅读指南</a></li><li class="chapter-item expanded "><a href="dream-list.html"><strong aria-hidden="true">4.</strong> ⭐ 4. 梦想清单 | Dream List</a></li><li class="chapter-item expanded "><a href="planning.html"><strong aria-hidden="true">5.</strong> 5. 人生规划 | Life Planning</a></li><li class="chapter-item expanded "><a href="year-plan.html"><strong aria-hidden="true">6.</strong> 6. 年度计划 | Year Plan</a></li><li class="chapter-item expanded affix "><li class="part-title">生活碎笔 | Life Traveling</li><li class="chapter-item expanded "><a href="literature/index.html"><strong aria-hidden="true">7.</strong> ⭐ 7. 文章与写作 | Literature</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="literature/essays.html"><strong aria-hidden="true">7.1.</strong> 8. 随笔随记 | Essays</a></li><li class="chapter-item expanded "><a href="literature/poems.html"><strong aria-hidden="true">7.2.</strong> 9. 诗词 | Poems</a></li><li class="chapter-item expanded "><a href="literature/feelings.html"><strong aria-hidden="true">7.3.</strong> 10. 感触 | Feelings</a></li><li class="chapter-item expanded "><a href="literature/insanes.html"><strong aria-hidden="true">7.4.</strong> 11. 胡言 | Insanes</a></li><li class="chapter-item expanded "><a href="literature/novels.html"><strong aria-hidden="true">7.5.</strong> 12. 小说 | Novels</a></li></ol></li><li class="chapter-item expanded "><li class="part-title">学习与进步 | Learning and Progressing</li><li class="chapter-item expanded "><a href="learning/intro.html"><strong aria-hidden="true">8.</strong> 13. 各领域入门 | How to Learn</a></li><li class="chapter-item expanded "><a href="learning/patchouli.html"><strong aria-hidden="true">9.</strong> ⭐ 14. 学海计划 | Patchouli Project</a></li><li class="chapter-item expanded "><a href="learning/cs-guide.html"><strong aria-hidden="true">10.</strong> 15. 计算机科学简入门指南 | Computer Science Guide</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
