(function () {
        var allowedModes = ["demo", "actual"];
        var params = new URLSearchParams(window.location.search);
        var requestedMode = params.get("mode");
        var storedMode = "";

        try {
                storedMode = localStorage.getItem("clairo-mode") || "";
                localStorage.setItem("clairo-version", "v2");
        } catch (error) {
                storedMode = "";
        }

        var mode = allowedModes.indexOf(requestedMode) >= 0
                ? requestedMode
                : allowedModes.indexOf(storedMode) >= 0
                        ? storedMode
                        : "actual";

        function persistMode(nextMode) {
                if (allowedModes.indexOf(nextMode) < 0) return;
                mode = nextMode;
                try {
                        localStorage.setItem("clairo-mode", mode);
                        localStorage.setItem("clairo-version", "v2");
                } catch (error) { }
        }

        persistMode(mode);

        function setModeAttributes() {
                document.documentElement.dataset.mode = mode;
                if (document.body) {
                        document.body.dataset.mode = mode;
                }
        }

        function withMode(href, nextMode) {
                if (!href || href.indexOf("#") === 0 || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) {
                        return href;
                }

                var url = new URL(href, window.location.href);
                url.searchParams.set("mode", nextMode || mode);
                return url.href;
        }

        function updateModeText() {
                var copy = {
                        demo: {
                                label: "Demo run",
                                subtitle: "Prefilled investor walkthrough",
                                applicant: "Vincent Vega",
                                status: "Ready to present"
                        },
                        actual: {
                                label: "Live intake",
                                subtitle: "Real application workspace",
                                applicant: "New applicant",
                                status: "Secure draft"
                        }
                }[mode];

                document.querySelectorAll("[data-mode-label]").forEach(function (node) {
                        node.textContent = copy.label;
                });
                document.querySelectorAll("[data-mode-subtitle]").forEach(function (node) {
                        node.textContent = copy.subtitle;
                });
                document.querySelectorAll("[data-mode-applicant]").forEach(function (node) {
                        node.textContent = copy.applicant;
                });
                document.querySelectorAll("[data-mode-status]").forEach(function (node) {
                        node.textContent = copy.status;
                });
        }

        function hydrateDemoValues() {
                document.querySelectorAll("[data-demo-value]").forEach(function (field) {
                        if (mode === "demo") {
                                field.value = field.dataset.demoValue;
                        } else if (field.dataset.actualValue) {
                                field.value = field.dataset.actualValue;
                        } else {
                                field.value = "";
                        }
                });

                document.querySelectorAll("[data-demo-text]").forEach(function (node) {
                        if (mode === "demo") {
                                node.textContent = node.dataset.demoText;
                        } else if (node.dataset.actualText) {
                                node.textContent = node.dataset.actualText;
                        }
                });
        }

        function setUploadState(card, complete) {
                var status = card.querySelector("[data-upload-status]");
                var action = card.querySelector("[data-upload-action]");
                var icon = card.querySelector("[data-upload-icon]");

                card.classList.toggle("is-complete", complete);
                card.setAttribute("aria-pressed", complete ? "true" : "false");

                if (status) {
                        status.textContent = complete
                                ? status.dataset.complete
                                : status.dataset.empty;
                }

                if (action) {
                        action.textContent = complete ? "Verified" : "Add file";
                }

                if (icon) {
                        icon.textContent = complete ? "check_circle" : "upload_file";
                        icon.classList.toggle("filled-icon", complete);
                }
        }

        function updateUploadProgress() {
                var cards = Array.prototype.slice.call(document.querySelectorAll("[data-upload-card]"));
                if (!cards.length) return;

                var complete = cards.filter(function (card) {
                        return card.classList.contains("is-complete");
                }).length;

                var progressFill = document.querySelector("[data-doc-progress-fill]");

                document.querySelectorAll("[data-doc-progress]").forEach(function (progressText) {
                        progressText.textContent = complete + " of " + cards.length + " verified";
                });

                if (progressFill) {
                        progressFill.style.width = Math.round((complete / cards.length) * 100) + "%";
                }
        }

        function showToast(title, message, icon) {
                var container = document.getElementById("toast-container");
                if (!container) {
                        container = document.createElement("div");
                        container.id = "toast-container";
                        document.body.appendChild(container);
                }

                var toast = document.createElement("div");
                toast.className = "toast";
                
                toast.innerHTML = '<span class="material-symbols-outlined">' + (icon || 'info') + '</span><div class="toast-content"><span class="toast-title">' + title + '</span><span class="toast-message">' + message + '</span></div>';

                container.appendChild(toast);

                requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                                toast.classList.add("show");
                        });
                });

                setTimeout(function() {
                        toast.classList.remove("show");
                        setTimeout(function() {
                                toast.remove();
                        }, 400);
                }, 4000);
        }

        function simulateAIUpload(card, fileName) {
                var status = card.querySelector("[data-upload-status]");
                var action = card.querySelector("[data-upload-action]");
                var icon = card.querySelector("[data-upload-icon]");

                card.classList.remove("is-complete");
                card.classList.add("is-scanning");
                card.style.borderColor = "var(--primary)";
                
                if (status) status.textContent = "Scanning with Specter AI...";
                if (action) action.textContent = "Processing";
                if (icon) {
                        icon.textContent = "document_scanner";
                        icon.classList.remove("filled-icon");
                }

                var aiStatusPanel = document.getElementById("ai-status-panel");
                if (aiStatusPanel) {
                        var pill = aiStatusPanel.querySelector(".status-pill");
                        var title = aiStatusPanel.querySelector(".panel-title");
                        var copy = aiStatusPanel.querySelector(".panel-copy");
                        if (pill) {
                                pill.className = "status-pill primary";
                                pill.textContent = "Specter AI Active";
                        }
                        if (title) title.textContent = "Verifying document...";
                        if (copy) copy.textContent = "Extracting data from " + fileName;
                }

                setTimeout(function () {
                        var modal = document.getElementById("ocr-modal");
                        if (modal) {
                                modal.classList.add("show");
                                
                                var docTypeLabel = document.getElementById("ocr-doc-type");
                                if (docTypeLabel) docTypeLabel.textContent = fileName.split('.').shift();

                                var btnConfirm = document.getElementById("btn-ocr-confirm");
                                var btnCancel = document.getElementById("btn-ocr-cancel");
                                
                                var newConfirm = btnConfirm.cloneNode(true);
                                var newCancel = btnCancel.cloneNode(true);
                                btnConfirm.parentNode.replaceChild(newConfirm, btnConfirm);
                                btnCancel.parentNode.replaceChild(newCancel, btnCancel);
                                
                                newCancel.addEventListener("click", function() {
                                        modal.classList.remove("show");
                                        card.classList.remove("is-scanning");
                                        card.style.borderColor = "";
                                        if (status) status.textContent = status.dataset.empty;
                                        if (action) action.textContent = "Add file";
                                        if (icon) {
                                                icon.textContent = "upload_file";
                                        }
                                        showToast("Upload Cancelled", "Document extraction was cancelled.", "error");
                                        
                                        if (aiStatusPanel) {
                                                var pill = aiStatusPanel.querySelector(".status-pill");
                                                var title = aiStatusPanel.querySelector(".panel-title");
                                                var copy = aiStatusPanel.querySelector(".panel-copy");
                                                if (pill) {
                                                        pill.className = "status-pill dark";
                                                        pill.textContent = "Specter AI Idle";
                                                }
                                                if (title) title.textContent = "Waiting for files";
                                                if (copy) copy.textContent = "Upload documents to begin automated verification and data extraction.";
                                        }
                                });

                                newConfirm.addEventListener("click", function() {
                                        modal.classList.remove("show");
                                        showToast("Data Verified", "Document data extracted and saved.", "fact_check");
                                        
                                        card.classList.remove("is-scanning");
                                        card.style.borderColor = "";
                                        if (status) status.dataset.complete = fileName;
                                        setUploadState(card, true);
                                        updateUploadProgress();

                                        if (aiStatusPanel) {
                                                var pill = aiStatusPanel.querySelector(".status-pill");
                                                var title = aiStatusPanel.querySelector(".panel-title");
                                                var copy = aiStatusPanel.querySelector(".panel-copy");
                                                if (pill) {
                                                        pill.className = "status-pill dark";
                                                        pill.textContent = "Specter AI Ready";
                                                }
                                                if (title) title.textContent = "Document verified";
                                                if (copy) copy.innerHTML = "Extracted data matches profile.<br>Confidence: <b>98%</b>";
                                        }
                                });
                        } else {
                                card.classList.remove("is-scanning");
                                card.style.borderColor = "";
                                if (status) status.dataset.complete = fileName;
                                setUploadState(card, true);
                                updateUploadProgress();
                                showToast("Document Uploaded", fileName + " was processed successfully.", "check_circle");

                                if (aiStatusPanel) {
                                        var pill = aiStatusPanel.querySelector(".status-pill");
                                        var title = aiStatusPanel.querySelector(".panel-title");
                                        var copy = aiStatusPanel.querySelector(".panel-copy");
                                        if (pill) {
                                                pill.className = "status-pill dark";
                                                pill.textContent = "Specter AI Ready";
                                        }
                                        if (title) title.textContent = "Document verified";
                                        if (copy) copy.innerHTML = "Extracted data matches profile.<br>Confidence: <b>98%</b>";
                                }
                        }
                }, 1800);
        }

        function initUploads() {
                document.querySelectorAll("[data-upload-card]").forEach(function (card) {
                        var startsComplete = mode === "demo" || card.dataset.complete === "true";
                        setUploadState(card, startsComplete);

                        var fileInput = document.createElement("input");
                        fileInput.type = "file";
                        fileInput.style.display = "none";
                        fileInput.accept = ".pdf,.jpg,.jpeg,.png";
                        card.appendChild(fileInput);

                        card.addEventListener("click", function () {
                                if (mode === "demo" || card.classList.contains("is-scanning")) return;
                                fileInput.click();
                        });

                        fileInput.addEventListener("change", function () {
                                if (fileInput.files.length > 0) {
                                        simulateAIUpload(card, fileInput.files[0].name);
                                }
                        });
                });

                updateUploadProgress();
        }

        function updateServiceHeader() {
                var params = new URLSearchParams(window.location.search);
                var serviceId = params.get("service");
                if (!serviceId) return;

                var serviceNames = {
                        "visa-renewal": "Visa Renewal",
                        "residence-permit": "Residence Permit",
                        "health-insurance": "Health Insurance",
                        "university-registration": "University Registration"
                };

                var serviceName = serviceNames[serviceId];
                if (serviceName) {
                        document.querySelectorAll(".eyebrow").forEach(function(node) {
                                if (node.textContent === "Visa Renewal" || node.textContent === "Smart Path Matching") {
                                        node.textContent = serviceName;
                                }
                        });
                }
        }

        function initCopilot() {
                var fab = document.createElement("button");
                fab.id = "copilot-fab";
                fab.innerHTML = '<span class="material-symbols-outlined">auto_awesome</span>';
                document.body.appendChild(fab);

                var win = document.createElement("div");
                win.id = "copilot-window";
                win.innerHTML = '<div class="copilot-header"><span class="material-symbols-outlined">auto_awesome</span><h3>Specter AI Copilot</h3></div><div class="copilot-messages" id="copilot-msgs"><div class="chat-bubble ai">Hi there! I\'m Specter AI. I\'m analyzing your profile to help assemble your paperwork. How can I help you today?</div></div><div class="copilot-input"><input type="text" id="copilot-text" placeholder="Ask a question..." /><button id="copilot-send"><span class="material-symbols-outlined">send</span></button></div>';
                document.body.appendChild(win);

                fab.addEventListener("click", function() {
                        win.classList.toggle("open");
                });

                var input = document.getElementById("copilot-text");
                var send = document.getElementById("copilot-send");
                var msgs = document.getElementById("copilot-msgs");

                function addMessage(text, type) {
                        var b = document.createElement("div");
                        b.className = "chat-bubble " + type;
                        b.textContent = text;
                        msgs.appendChild(b);
                        msgs.scrollTop = msgs.scrollHeight;
                }

                function handleSend() {
                        var text = input.value.trim();
                        if (!text) return;
                        addMessage(text, "user");
                        input.value = "";
                        
                        setTimeout(function() {
                                var reply = "I've scanned your current progress. You have documents verified. Just upload your remaining documents and we'll have your packet ready!";
                                if (text.toLowerCase().indexOf("missing") > -1 || text.toLowerCase().indexOf("need") > -1) {
                                        reply = "You still need to provide your Bank Statement and Health Insurance.";
                                } else if (text.toLowerCase().indexOf("time") > -1 || text.toLowerCase().indexOf("long") > -1) {
                                        reply = "Our automated pipeline typically assembles the packet in under 2 minutes once all files are verified.";
                                }
                                addMessage(reply, "ai");
                        }, 1000);
                }

                send.addEventListener("click", handleSend);
                input.addEventListener("keypress", function(e) {
                        if (e.key === "Enter") handleSend();
                });
        }

        function initDownload() {
                var btn = document.getElementById("btn-download-packet");
                if (!btn) return;
                
                btn.addEventListener("click", function() {
                        if (btn.classList.contains("is-loading")) return;
                        
                        var originalText = btn.innerHTML;
                        btn.classList.add("is-loading");
                        btn.innerHTML = 'Assembling... <span class="material-symbols-outlined" style="animation: spin 1s linear infinite;">sync</span>';
                        
                        setTimeout(function() {
                                btn.innerHTML = 'Downloading... <span class="material-symbols-outlined">cloud_download</span>';
                                
                                setTimeout(function() {
                                        btn.classList.remove("is-loading");
                                        btn.innerHTML = 'Packet Downloaded <span class="material-symbols-outlined">check</span>';
                                        
                                        var a = document.createElement('a');
                                        a.href = "data:text/plain;charset=utf-8,Clairo%20Verified%20Packet%0A%0AAll%20documents%20have%20been%20verified%20by%20Specter%20AI%20and%20are%20ready%20for%20submission.";
                                        a.download = "Clairo_Verified_Packet.txt";
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);

                                        showToast("Packet Downloaded", "Your verified documents are ready.", "check_circle");
                                        
                                        setTimeout(function() {
                                                btn.innerHTML = originalText;
                                        }, 3000);
                                }, 1500);
                        }, 1500);
                });
        }

        function initLinks() {
                document.querySelectorAll("[data-set-mode]").forEach(function (node) {
                        node.addEventListener("click", function () {
                                persistMode(node.dataset.setMode);
                        });
                });

                document.querySelectorAll("a[data-mode-link]").forEach(function (link) {
                        link.href = withMode(link.getAttribute("href"), mode);
                });

                document.querySelectorAll("[data-service-card]").forEach(function (card) {
                        card.addEventListener("click", function (event) {
                                if (event.target.closest("a, button")) return;
                                var link = card.querySelector("a[data-mode-link]");
                                if (link) {
                                        link.click();
                                }
                        });
                });
        }

        function initReveal() {
                var nodes = document.querySelectorAll("[data-reveal]");
                if (!nodes.length) return;

                if (!("IntersectionObserver" in window)) {
                        nodes.forEach(function (node) {
                                node.classList.add("reveal");
                        });
                        return;
                }

                var observer = new IntersectionObserver(function (entries) {
                        entries.forEach(function (entry) {
                                if (entry.isIntersecting) {
                                        entry.target.classList.add("reveal");
                                        observer.unobserve(entry.target);
                                }
                        });
                }, { threshold: 0.12 });

                nodes.forEach(function (node) {
                        observer.observe(node);
                });
        }

        document.addEventListener("DOMContentLoaded", function () {
                setModeAttributes();
                updateModeText();
                updateServiceHeader();
                hydrateDemoValues();
                initLinks();
                initUploads();
                initReveal();
                initDownload();
                initCopilot();

                if ("fonts" in document) {
                        document.fonts.ready.then(function () {
                                document.body.classList.add("fonts-loaded");
                        });
                } else {
                        // Fallback for older browsers
                        setTimeout(function () {
                                document.body.classList.add("fonts-loaded");
                        }, 100);
                }
        });
})();
