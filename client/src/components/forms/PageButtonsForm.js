"use client";
import { ReactSortable } from "react-sortablejs";
import SectionBox from "../layout/SectionBox";
import {
  faEnvelope,
  faGripLines,
  faMobile,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

export const allButtons = [
  {
    key: "email",
    label: "e-mail",
    icon: faEnvelope,
    placeholder: "text@example.com",
  },
  {
    key: "mobile",
    label: "mobile",
    icon: faMobile,
    placeholder: "+00 000 000 0000",
  },
  {
    key: "instagram",
    label: "instagram",
    icon: faInstagram,
    placeholder: "https://instagram.com/xxx",
  },
  {
    key: "facebook",
    label: "facebook",
    icon: faFacebook,
    placeholder: "https://facebook.com/profile/xxx",
  },
  {
    key: "discord",
    label: "discord",
    icon: faDiscord,
    placeholder: "xxxx#1111",
  },
  {
    key: "tiktok",
    label: "tiktok",
    icon: faTiktok,
    placeholder: "xxxxxx xxxxxx",
  },
  {
    key: "youtube",
    label: "youtube",
    icon: faYoutube,
    placeholder: "Xxxx Xxxx",
  },
  {
    key: "whatsapp",
    label: "whatsapp",
    icon: faWhatsapp,
    placeholder: "+00 000 000 0000",
  },
  { key: "github", label: "github", icon: faGithub, placeholder: "xxxx" },
  { key: "telegram", label: "telegram", icon: faTelegram, placeholder: "xxxx" },
];

export default function PageButtonsForm({ user, page }) {
  let pageSavedButtonsKeys = [];
  let pageButtonsFromServer = [""];
  if(page.buttons){
    pageSavedButtonsKeys = Object.keys(page.buttons);
    pageButtonsFromServer = page.buttons;
  }

  
  const pageSavedButtonsInfo = pageSavedButtonsKeys.map((k) =>
    allButtons.find((b) => b.key === k)
  );
  const [activeButtons, setActiveButtons] = useState(pageSavedButtonsInfo);

  function addButtonToProfile(button) {
    setActiveButtons((prevButtons) => {
      return [...prevButtons, button];
    });
  }

  async function saveButtons(formData) {
    await savePageButtons(formData);
    toast.success("Settings Saved!");
  }

  const avaibleButtons = allButtons.filter(
    (b1) => !activeButtons.find((b2) => b1.key === b2.key)
  );

  function removeButton({ key: keyToRemove }) {
    setActiveButtons((prevButtons) => {
      return prevButtons.filter((button) => button.key !== keyToRemove);
    });
  }
  return (
    <SectionBox>
      <form action={saveButtons}>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <ReactSortable
          handle={".handle"}
          list={activeButtons}
          setList={setActiveButtons}
        >
          {activeButtons.map((b) => (
            <div key={b.key} className="mb-4 md:flex items-center">
              <div className="w-48 flex p-2 gap-2 text-green-500 items-center">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className=" text-gray-600 handle cursor-pointer"
                />
                <FontAwesomeIcon icon={b.icon} />
                <span className="capitalize">{b.label}:</span>
              </div>
              <div className="grow flex">
                <input
                  className="user-input"
                  placeholder={b.placeholder}
                  style={{ marginBottom: "0" }}
                  name={b.key}
                  defaultValue={pageButtonsFromServer[b.key]}
                  type="text"
                />
                <button
                  onClick={() => removeButton(b)}
                  className="py-2 px-4 bg-gray-300 cursor-pointer"
                  type="button"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="flex flex-wrap gap-2 mt-4 border-t border-y py-4 pt-4">
          {avaibleButtons.map((b) => (
            <button
            key={b.key}
              type="button"
              onClick={() => addButtonToProfile(b)}
              className="flex items-center gap-2 p-2 bg-gray-200"
            >
              <FontAwesomeIcon icon={b.icon} />
              <span className="capitalize">{b.label}</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
