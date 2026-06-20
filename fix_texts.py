import re

path = "/Users/ooshimaryou/portfolio/src/components/Texts.jsx"

with open(path, "r") as f:
    content = f.read()

# stateとヘルパー関数を追加
old = "const [expanded, setExpanded] = useState(null);"
new = """const [expanded, setExpanded] = useState(null);
  const [modal, setModal] = useState(null);
  const openModal = (text) => setModal(text);
  const closeModal = () => setModal(null);"""

content = content.replace(old, new, 1)

# useEffectにmodalのoverflow制御を追加（既存useEffectの後）
old2 = "  const toggle = (id, el) => {"
new2 = """  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const toggle = (id, el) => {"""

content = content.replace(old2, new2, 1)

# </section>の直前にモーダルJSXを挿入
modal_jsx = """
      {modal && (
        <div className="text-modal-overlay" onClick={closeModal}>
          <div className="text-modal" onClick={(e) => e.stopPropagation()}>
            <div className="text-modal-header">
              <div>
                <div className="text-modal-title">{modal.title}</div>
                <div className="text-modal-meta">{modal.year} · {modal.genre}</div>
              </div>
              <button className="text-modal-close" onClick={closeModal}>閉じる</button>
            </div>
            <div className="text-modal-body">
              {modal.full.split("\\n\\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
"""

content = content.replace("    </section>", modal_jsx + "    </section>", 1)

with open(path, "w") as f:
    f.write(content)

print("Done")
