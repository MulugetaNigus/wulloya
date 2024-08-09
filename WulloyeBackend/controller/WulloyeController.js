const WulloyeModel = require("../model/WulloyeModel");
const RegisterModel = require("../model/WulloyeRegister");

// register api
const register = async (req, res) => {
  try {
    // descructure the fields from the request body
    const { email, password } = req.body;

    // check weather the data inserted or not and decide your own logic
    if (!email || !password) {
      return res.status(400).send({ message: "all fields are required !" });
    }

    // hash the password before submitted
    // const hashedPassword = await bcrypt.hash(password, 12);

    // // make your data more organized format to send into the database
    // const userinfo = {
    //   email: email,
    //   password: hashed2Password,
    // };

    // check if the email already exist
    const checkExistance = await RegisterModel.find({ email });
    if (checkExistance.email === email) {
      return res
        .status(400)
        .send({ message: "email already exist, try another one !" });
    }
    // add your data to the database
    const Account = {
      email,
      password,
    };
    const addUser = await RegisterModel.create(Account);

    // check the operation work perfectly or not,
    if (!addUser) {
      return res.status(400).json({ message: "can not add the user !" });
    }

    // get back the inserted data
    return res.status(200).json({ message: true, data: addUser });

    // handle further error
  } catch (error) {
    return res
      .status(400)
      .json({ message: "can not register the user due to : " + error.message });
  }
};

//login api
const login = async (req, res) => {
  try {
    // get the user info
    const { email, password } = req.body;

    // find the user based on the above given data
    const getUser = await RegisterModel.findOne({ email });

    // find the user
    if (!getUser) {
      return res.status(400).send({ message: "user not found !" });
    } else if (getUser.password != password) {
      return res.status(400).send({ message: "incorrect password !" });
    }
    // successfully logedIn
    return res.status(200).send({ message: true });

    // decode the user password
    // const decodePassword = await bcrypt.compare(password, getUser.password);

    // // check the dcrypted data match the new one
    // if (decodePassword) {
    //   return res.status(200).send({ message: "successfully Login !" });
    //   // if any confussion happen here handle it
    // } else {
    //   return res.status(400).send({ message: "incorrect password !" });
    // }
    // further error analysis
  } catch (error) {
    res.status(400).send({ message: "can not login !" });
  }
};
// get the post api
const getPost = async (req, res) => {
  try {
    // fetch the post from the db
    const fetchPost = await WulloyeModel.find({}).sort({ createdAt: -1 });
    // check wether the data send to the db or not
    if (!fetchPost) {
      return res.status(400).send({ message: "can not fetch the post !" });
    }
    return res.status(200).json({ fetchPost });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "an error occured due to: " + error });
  }
};

// post api
const addPost = async (req, res) => {
  try {
    // get the requirnments from the user like:- main-post and tags
    const { username, MainPost, tags } = req.body;

    // try to send the data to the db
    const PostWullo = await WulloyeModel.create(req.body);

    // check wether the data send to the db or not
    if (!PostWullo) {
      return res.status(400).send({ message: "can not save the post !" });
    }
    return res.status(200).send({ message: "post saved !" });
  } catch (error) {}
  return res.status(400).send({ message: "an error occured due to: " });
};

// get a single post for the detail page
const getDetailPost = async (req, res) => {
  try {
    // fetch the post from the db accourding to the id
    const { id } = req.params;
    const fetchPost = await WulloyeModel.findById(id);
    // check wether the data send to the db or not
    if (!fetchPost) {
      return res.status(400).send({ message: "can not fetch the post !" });
    }
    return res.status(200).json({ fetchPost });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "an error occured due to: " + error });
  }
};

module.exports = { addPost, getPost, getDetailPost, register, login };
