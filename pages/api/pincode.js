export default function handler(req, res) {
  let pincodes = {
    110055: ["Paharganj", "New Delhi"],
    110012: ["Inderpuri", "New Delhi"],
    110060: ["Pahari dhiraj", "Old Delhi"],
  };
  res.status(200).json(pincodes);
}
