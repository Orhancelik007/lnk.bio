"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faCloudArrowUp,
  faGripLines,
  faLink,
  faPlus,
  faSave,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../buttons/SubmitButton";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { UploadButton } from "@/app/utils/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.links || []);
  async function save() {
    await savePageLinks(links);
    toast.success("Saved!");
  }
  function addNewLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          title: "",
          subtitle: "",
          icon: "",
          url: "",
        },
      ];
    });
  }

  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    });
  }

  function removeLink(linkKeyToRemove){
    setLinks(prevLinks => [...prevLinks].filter(l => l.key !== linkKeyToRemove));
  }
  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-green-500 text-lg flex gap-2 items-center cursor-pointer"
        >
          <FontAwesomeIcon
            className="bg-green-500 text-white p-1 rounded-full aspect-square"
            icon={faPlus}
          />
          <span>Add new</span>
        </button>
        <ReactSortable handle={".handle"} list={links} setList={setLinks}>
          {links.map((l) => (
            <div key={l.key} className="mt-8 md:flex gap-2 items-center">
              <div className="handle">
                <FontAwesomeIcon
                  className="text-gray-700 mr-2 cursor-pointer"
                  icon={faGripLines}
                />
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white w-16 h-16 inline-flex justify-center items-center relative aspect-square overflow-hidden">
                  {l.icon && (
                    <Image
                      className="object-cover w-full h-full"
                      width={64}
                      height={64}
                      src={l.icon}
                      alt={"icon"}
                    />
                  )}
                  {!l.icon && <FontAwesomeIcon size="xl" icon={faLink} />}
                </div>
                <div className="mt-4">
                  <UploadButton
                    className="ut-button:bg-green-600"
                    endpoint="imageUploader"
                    content={{
                      allowedContent({ ready, fileTypes, isUploading }) {
                        if (!ready) return "";
                        return "";
                      },
                    }}
                    onClientUploadComplete={(res) => {
                      console.log(res);
                      //setAvatar(res[0].url);
                      setLinks((prevLinks) => {
                        const newLinks = [...prevLinks];
                        newLinks.forEach((link, index) => {
                          if (link.key === l.key) {
                            link.icon = res[0].url;
                          }
                        });
                        return newLinks;
                      });
                      toast.success("Picture Saved!");
                    }}
                    onUploadError={(err) => {
                      toast.error(`Error: ${err.message}`);
                    }}
                  />
                </div>
              </div>
              <div className="grow">
                <label className="input-label">Title:</label>
                <input
                  value={l.title}
                  onChange={(ev) => handleLinkChange(l.key, "title", ev)}
                  className="user-input"
                  type="text"
                  placeholder="title"
                />
                <label className="input-label">Subtitle:</label>
                <input
                  value={l.subtitle}
                  onChange={(ev) => handleLinkChange(l.key, "subtitle", ev)}
                  className="user-input"
                  type="text"
                  placeholder="subtitle (optional)"
                />
                <label className="input-label">URL:</label>
                <input
                  value={l.url}
                  onChange={(ev) => handleLinkChange(l.key, "url", ev)}
                  className="user-input"
                  type="text"
                  placeholder="url"
                />
              </div>
              <div className="flex">
                <button
                onClick={() => removeLink(l.key)}
                  type="button"
                  className="bg-gray-300 w-full mt-6 py-20 px-3 rounded-md  mb-2 h-full "
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </SectionBox>
  );
}
