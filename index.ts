import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import multer from 'multer';
import { ItemsController } from './controllers/ItemsController';
import { AuthController } from './controllers/AuthController';
import { CommentController } from './controllers/CommentController';

const app: Express = express();
const itemsController = new ItemsController();
const authController = new AuthController();
const commentController = new CommentController();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));
// app.use(multer({ dest: "public/img" }).single("file"));

declare module "express-session" {
  interface SessionData {
    auth: boolean,  
    username: string,
    password: string,
    admin: boolean,
  }
};

// MULTER
let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/img/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
let upload = multer({ storage: storage });


//
app.listen(1415, () => {
  console.log('Server is running on port 1415');
});



app.get("/", (req: Request, res: Response) => {
  itemsController.home(req, res);
});

app.get("/items", (req: Request, res: Response) => {
  itemsController.index(req, res);
});

app.get("/items/category/:id", (req: Request, res: Response) => {
  itemsController.category(req, res);
});

app.get("/items/:id", (req: Request, res: Response) => {
  itemsController.show(req, res);
});

app.get("/items/action/create", (req: Request, res: Response) => {
  itemsController.create(req, res);
});

app.get("/categories/create", (req: Request, res: Response) => {
  itemsController.createCategPage(req, res);
});

app.post("/categories/action/create", (req: Request, res: Response) => {
  itemsController.createCateg(req, res);
});

app.post("/store", upload.single('file'), (req: Request, res: Response, next) => {
  itemsController.store(req, res);
});

app.post("/update", upload.single('file'), (req: Request, res: Response) => {
  itemsController.update(req, res);
});

app.post("/destroy", (req: Request, res: Response) => {
  itemsController.destroy(req, res);
});

app.get("/pers_acc", (req: Request, res: Response) => {
  authController.pers_acc(req, res);
});

app.get("/logIn", (req: Request, res: Response) => {
  authController.logIn_page(req, res);
});

app.get("/register", (req: Request, res: Response) => {
  authController.reg_page(req, res);
});

app.post("/auth", (req: Request, res: Response) => {
  authController.SignIn(req, res);
});

app.post("/registration", (req: Request, res: Response) => {
  authController.SignUp(req, res);
});

// app.post("/update_password", (req: Request, res: Response) => {
//   authController.updatePassword(req, res);
// });

app.get("/update_password", (req: Request, res: Response) => {
  authController.updatePassword(req, res);
});

// app.post("/destroy_account", (req: Request, res: Response) => {
//   authController.destroyAccount(req, res);
// });

app.get("/destroy_account", (req: Request, res: Response) => {
  authController.destroyAccount(req, res);
});

app.get("/create_admin", (req: Request, res: Response) => {
  authController.createAdmin(req, res);
});

// app.post("/create_admin", (req: Request, res: Response) => {
//   authController.createAdminAccount(req, res);
// });

app.post("/toFavorites", (req: Request, res: Response) => {
  authController.toFavorites(req, res);
});

app.post("/deleteFavorit", (req: Request, res: Response) => {
  authController.deleteFavorit(req, res);
});

app.get("/favorites", (req: Request, res: Response) => {
  authController.viewFavorites(req, res);
});

app.post("/logout", (req: Request, res: Response) => {
  authController.logout(req, res);
});

app.post("/createComment", (req: Request, res: Response) => {
  commentController.createComment(req, res);
});

app.post("/deleteComment", (req: Request, res: Response) => {
  commentController.destroyComment(req, res);
});

app.post("/search", (req: Request, res: Response) => {
  itemsController.searchItem(req, res);
});