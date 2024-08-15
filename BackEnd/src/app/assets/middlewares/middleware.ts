import multer from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req: Request, file:any, cb:any) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file:any, cb:any) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;
