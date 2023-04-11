import emailjs from "@emailjs/browser";
import { retrieveEducatorDetails } from "./Firebase";
import {
  AssessmentCheckFormQuestions,
  PlanningCheckFormQuestions,
} from "./Components/Config";

const sendEmail = async (user, educator, entry) => {
  try {
    const sendTo = await retrieveEducatorDetails(user, educator);
    let messageArr = [];

    if (entry.title === "Assessment File Check") {
      messageArr = AssessmentCheckFormQuestions.map((el, i) => {
        return (
          `${i === 0 ? "" : `\n\n`}${i + 1}. ` +
          `${el}:` +
          `\n${entry.details[`${el}-check`] ? `present\n` : `NOT present\n`}` +
          `${
            entry.details[`${el}-comment`]
              ? `${entry.details[`${el}-comment`]}`
              : `no comment`
          }`
        );
      });
    }
    if (entry.title === "Planning File Check") {
      messageArr = PlanningCheckFormQuestions.map((el, i) => {
        return (
          `${i === 0 ? "" : `\n\n`}${i + 1}. ` +
          `${el}:` +
          `\n${entry.details[`${el}-check`] ? `present\n` : `NOT present\n`}` +
          `${
            entry.details[`${el}-comment`]
              ? `${entry.details[`${el}-comment`]}`
              : `no comment`
          }`
        );
      });
    }

    const responseObj = {
      educator: educator,
      title: entry.title,
      date: entry.date,
      message: messageArr.toString(),
      send_to: sendTo.email,
      user: user,
      subject: `${entry.title} -- ${educator} -- ${entry.date}`,
    };

    emailjs
      .send(
        "service_4q52xfo",
        "template_os2g3ie",
        responseObj,
        "wKJkpcr4cDBZ75lFd"
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    throw err;
  }
};

export default sendEmail;
