const Modal = ({ isOpen, onClose, title, children, onConfirm, confirmText = 'Confirm', confirmStyle = 'btn-primary' }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                
                <div className="mb-6">
                    {children}
                </div>
                
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className={`btn ${confirmStyle}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
