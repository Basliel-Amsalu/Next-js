const handler = (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      return res.status(422).json({ error: "Invalid input" });
    }

    const newMessage = {
      email,
      name,
      message,
    };
  }
};

export default handler;
