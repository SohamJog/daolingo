import {
  StarIcon,
  ArrowPathIcon,
  FingerPrintIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

export const featuresData = [
  {
    color: "blue",
    title: "Data Posting Rewards",
    icon: StarIcon,
    description:
      "Earn rewards for contributing rare and dying language data to the network. Become a member and start contributing today!",
  },
  {
    color: "teal",
    title: "Data Validity Voting",
    icon: CheckIcon,
    description:
      "Immerse yourself in the DAO community and vote to uphold the accuracy of the posted language data, fostering a community-driven commitment to maintaining the highest standards.",
  },
  {
    color: "red",
    title: "Data Access for ML Model Training",
    icon: FingerPrintIcon,
    description:
      "Access language data and train custom machine learning models for language-related tasks, empowering communities that utilize these languages.",
  },
];

export default featuresData;
