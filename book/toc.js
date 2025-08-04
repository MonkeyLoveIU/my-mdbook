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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="intro.html"><strong aria-hidden="true">1.</strong> 简介</a></li><li class="chapter-item expanded "><a href="chapter_1.html"><strong aria-hidden="true">2.</strong> 第一章</a></li><li class="chapter-item expanded affix "><li class="part-title">简介 | Intro | プロフ | préface</li><li class="chapter-item expanded affix "><li class="part-title">博客阅读指南 | Blog Reading Guide</li><li class="chapter-item expanded "><a href="blog-reading.html"><strong aria-hidden="true">3.</strong> 博客阅读指南</a></li><li class="chapter-item expanded "><a href="dream-list.html"><strong aria-hidden="true">4.</strong> 梦想清单 | Dream List</a></li><li class="chapter-item expanded "><a href="planning.html"><strong aria-hidden="true">5.</strong> 人生规划 | Life Planning</a></li><li class="chapter-item expanded "><a href="year-plan.html"><strong aria-hidden="true">6.</strong> 年度计划 | Year Plan</a></li><li class="chapter-item expanded affix "><li class="part-title">生活碎笔 | Life Traveling</li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="literature/feelings.html"><strong aria-hidden="true">7.</strong> 个人感触 | Feelings</a></li><li class="chapter-item expanded "><a href="literature/insanes.html"><strong aria-hidden="true">8.</strong> 胡言乱语 | Insanes</a></li><li class="chapter-item expanded "><a href="literature/novels.html"><strong aria-hidden="true">9.</strong> 小说 | Novels</a></li><li class="chapter-item expanded affix "><li class="part-title">大航海计划（学海计划） | Learning and Progressing</li><li class="chapter-item expanded "><a href="Mathematical_Analysis/intro.html"><strong aria-hidden="true">10.</strong> 数学分析 | Mathematical Analysis</a></li><li class="chapter-item expanded "><a href="Advanced_Algebra/intro.html"><strong aria-hidden="true">11.</strong> 高等代数 | Advanced Algebra</a></li><li class="chapter-item expanded "><a href="Analytic_Geometry/intro.html"><strong aria-hidden="true">12.</strong> 解析几何 | Analytic Geometry</a></li><li class="chapter-item expanded "><a href="Probability_Theory_and_Mathematical_Statistics/intro.html"><strong aria-hidden="true">13.</strong> 概率论与数理统计 | Probability Theory and Mathematical Statistics</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">14.</strong> 常微分方程</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">15.</strong> 复变函数论</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">16.</strong> 实变函数与泛函分析基础</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">17.</strong> 复变函数论</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">18.</strong> 近世代数</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">19.</strong> python</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="python.md/1.html"><strong aria-hidden="true">19.1.</strong> pandas</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">20.</strong> 机器学习</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">20.1.</strong> </div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">20.2.</strong> </div></li><li class="chapter-item expanded "><a href="ai/KNN.html"><strong aria-hidden="true">20.3.</strong> KNN</a></li><li class="chapter-item expanded "><a href="ai/dist.html"><strong aria-hidden="true">20.4.</strong> 距离度量</a></li></ol></li><li class="chapter-item expanded "><a href="learning/intro.html"><strong aria-hidden="true">21.</strong> 各领域入门 | How to Learn</a></li><li class="chapter-item expanded "><a href="learning/patchouli.html"><strong aria-hidden="true">22.</strong> 学海计划 | Patchouli Project</a></li><li class="chapter-item expanded "><a href="learning/cs-guide.html"><strong aria-hidden="true">23.</strong> 计算机科学简入门指南 | Computer Science Guide</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">24.</strong> 心理学</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">24.1.</strong> </div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">25.</strong> 文学</div></li><li class="chapter-item expanded "><a href="ceri.html"><strong aria-hidden="true">26.</strong> 测试内容</a></li><li class="chapter-item expanded affix "><li class="part-title">写作与部署 | Writing and Deployment</li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="technique/mdbook.html"><strong aria-hidden="true">27.</strong> mdBook</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="technique/mdbookDeployment Process.html"><strong aria-hidden="true">27.1.</strong> mdbook部署流程 | Deployment Process</a></li><li class="chapter-item expanded "><a href="technique/grammatical structure.html"><strong aria-hidden="true">27.2.</strong> mdbook基础结构和 Markdown 编写语法大全</a></li><li class="chapter-item expanded "><a href="technique/write.html"><strong aria-hidden="true">27.3.</strong> mdbook写作</a></li><li class="chapter-item expanded "><a href="technique/github.html"><strong aria-hidden="true">27.4.</strong> mdbook，github仓库同步</a></li><li class="chapter-item expanded "><a href="technique/git.html"><strong aria-hidden="true">27.5.</strong> Git安装</a></li><li class="chapter-item expanded "><a href="technique/ssh.html"><strong aria-hidden="true">27.6.</strong> SSH推送</a></li><li class="chapter-item expanded "><a href="technique/math.html"><strong aria-hidden="true">27.7.</strong> 数学公式插件</a></li></ol></li></ol>';
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
