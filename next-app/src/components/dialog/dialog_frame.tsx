"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  CSSProperties,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./dialog_frame.module.css";

interface DialogProps {
  title: string;

  children?: React.ReactNode;
  toggleItem?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  style?: CSSProperties;
}

export const DialogFrame: React.FC<DialogProps> = (props: DialogProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [mounted, setMounted] = useState(false);

  const closeDialog = useCallback(() => {
    if (props.onClose) props.onClose();
    else setShowDialog(false);
  }, [props]);

  const unfocusall = () => {
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((el) => (el as HTMLElement).blur());
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!showDialog) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        unfocusall();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog, showDialog]);

  useEffect(() => {
    if (props.isOpen !== undefined) {
      setShowDialog(props.isOpen);
    }
  }, [props.isOpen]);

  const dialogContent = (
    <AnimatePresence>
      {showDialog && (
        <div>
          <div className={styles.dialogBackground} onClick={closeDialog} />
          <motion.div
            key="dialog"
            className={`${styles.dialog}`}
            initial={{ opacity: 0, top: "70%" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "30%" }}
            transition={{ duration: 0.5 }}
            style={props.style}
          >
            <div className="flex flex-row justify-between">
              <h2 className="text-xl font-bold mb-4">{props.title}</h2>
              <button
                className="bg-(--red) px-3 flex justify-center items-center rounded-lg border-solid border-[2px] w-10 h-10"
                onClick={closeDialog}
              >
                x
              </button>
            </div>
            {props.children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <Fragment>
      {props.toggleItem && (
        <div onClick={() => setShowDialog(true)}>{props.toggleItem}</div>
      )}
      {mounted && createPortal(dialogContent, document.body)}
    </Fragment>
  );
};
