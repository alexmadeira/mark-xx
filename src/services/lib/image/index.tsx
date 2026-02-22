import { cloudinaryImageSizes } from '_CFG/image/cloudinaryImage'

import { CloudinaryImage } from './cloudinary-image'

let cloudinaryImage: CloudinaryImage<typeof cloudinaryImageSizes>

export function imageCloudinary() {
  if (!cloudinaryImage) cloudinaryImage = new CloudinaryImage(cloudinaryImageSizes)
  return cloudinaryImage
}
