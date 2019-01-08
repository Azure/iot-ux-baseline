import Home from "./home/manifest";
import About from "./about/manifest";

export interface Manifest {
    panel?: React.ReactNode;
    navItem?: React.ReactNode;
}


export const manifests = [
    Home,
    About,
];
