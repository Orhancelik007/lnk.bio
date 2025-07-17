"use client";
import {
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import savePageSettings from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";
import { UploadButton } from "@/app/utils/uploadthing";
import SectionBox from "../layout/SectionBox";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);
  async function saveBaseSettings(formData) {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Saved!");
    }
  }
  return (
    <div>
      <SectionBox>
        <form action={saveBaseSettings}>
          <div
            className=" py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
            style={
              bgType === "color"
                ? { backgroundColor: bgColor }
                : { backgroundImage: `url(${bgImage})` }
            }
          >
            <div>
              <RadioTogglers
                defaultValue={page.bgType}
                options={[
                  { value: "color", icon: faPalette, label: "Color" },
                  { value: "image", icon: faImage, label: "Image" },
                ]}
                onChange={(val) => setBgType(val)}
              />

              {bgType === "color" && (
                <div className="bg-gray-200 shadow p-1 text-gray-700 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Background color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={(ev) => setBgColor(ev.target.value)}
                      defaultValue={page.bgColor}
                    />
                  </div>
                </div>
              )}
              {bgType === "image" && (
                <div className="flex justify-center">
                  <label className="bg-white shadow px-4 py-2 mt-2">
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        console.log("upload completed: " + res[0].url);
                        setBgImage(res[0].url);
                        toast.success("Image Saved!");
                      }}
                      onUploadError={(err) => {
                        toast.error(`Error: ${err.message}`);
                      }}
                    />
                    <input type="hidden" name="bgImage" value={bgImage} />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt="avatar"
                  width={128}
                  height={128}
                />
              </div>
              <UploadButton
                id="deneme"
                className="absolute -bottom-8 right-0 ut-button:rounded-full ut-button:w-10 ut-button:h-10 p-0 m-0"
                content={{
                  button({ ready }) {
                    if (!ready)
                      return <FontAwesomeIcon size={"xl"} icon={faSpinner} />;
                    return (
                      <FontAwesomeIcon size={"xl"} icon={faCloudArrowUp} />
                    );
                  },
                  allowedContent({ ready, fileTypes, isUploading }) {
                    if (!ready) return "";
                    return "";
                  },
                }}
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setAvatar(res[0].url);
                  toast.success("Picture Saved!");
                }}
                onUploadError={(err) => {
                  toast.error(`Error: ${err.message}`);
                }}
              />
              <input type="hidden" name="avatar" value={avatar} />
            </div>
          </div>
          <div className="p-0">
            <label className="input-label" htmlFor="nameIn">
              Display name
            </label>
            <input
              className="user-input"
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder="John Wick"
            />
            <label className="input-label" htmlFor="locationIn">
              Location
            </label>
            <input
              className="user-input"
              name="location"
              defaultValue={page.location}
              type="text"
              id="locationIn"
              placeholder="Somewhere in the world"
            />
            <label className="input-label" htmlFor="bioIn">
              Bio
            </label>
            <textarea
              name="bio"
              defaultValue={page.bio}
              id="bioIn"
              placeholder="Your bio goes here..."
            />
            <div className="max-w-[200px] mx-auto mt-4">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      </SectionBox>
    </div>
  );
}
