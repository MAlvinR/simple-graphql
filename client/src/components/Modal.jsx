const Modal = ({ children, onClose }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0, left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 8,
                    minWidth: 300,
                    maxWidth: "80%",
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()}>
                <button
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "transparent",
                        border: "none",
                        fontSize: 20,
                        cursor: "pointer",
                    }}
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;