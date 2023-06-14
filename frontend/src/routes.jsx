import { Home, Profile, SignIn, SignUp, Inputs, VoterPage, Archive, Admin } from "@/pages";

import {
  HomeIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    icon: HomeIcon,
    name: "voterpage",
    path: "/voterpage",
    element: <VoterPage />,
  },
  {
    icon: HomeIcon,
    name: "admin",
    path: "/admin",
    element: <Admin />,
  },
  {
    icon: HomeIcon,
    name: "archive",
    path: "/archive",
    element: <Archive />,
  },
  {
    icon: UserCircleIcon,
    name: "inputs",
    path: "/inputs",
    element: <Inputs />,
  },
  {
    icon: UserCircleIcon,
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    icon: UserPlusIcon,
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    icon: DocumentTextIcon,
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
];

export default routes;
