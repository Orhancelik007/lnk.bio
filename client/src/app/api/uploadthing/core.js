import { createUploadthing} from "uploadthing/next";
const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
// Define as many FileRoutes as you like, each with a unique routeSlug
imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
.onUploadComplete(async ({ file }) => {
console.log("file url", file.url);
// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
return { message:"Image Upload Complete" };
}),
} ;