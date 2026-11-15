"use client";

import { useSite } from "./SiteProvider";
import { TermsText, SupportText } from "./InfoText";
import JoinForm from "./JoinForm";

export default function Modal() {
  const { modal, setModal } = useSite();
  const close = () => setModal(null);
  return (
    <div id="modal" className={modal ? "on" : ""} onClick={(e) => e.target.id === "modal" && close()}>
      <div className="mbox">
        <button className="cl" onClick={close} aria-label="Close">×</button>
        {modal === "terms" && <TermsText />}
        {modal === "support" && <SupportText />}
        {modal === "join" && <JoinForm onDone={close} />}
      </div>
    </div>
  );
}
