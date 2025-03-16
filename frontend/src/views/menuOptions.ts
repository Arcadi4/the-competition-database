import { DocAdd, HomeTwo, Info, Search } from "@icon-park/vue-next";
import { MenuOption } from "naive-ui";
import { h } from "vue";
import { RouterLink } from "vue-router";
import { Inspection } from "@icon-park/vue-next/es";

export const menuOptions: MenuOption[] = [
    menuItem("timeline", "Timeline", () => h(HomeTwo, { style: IconStyle })),
    menuItem("search", "Search", () => h(Search, { style: IconStyle })),
    menuItem("about", "About", () => h(Info, { style: IconStyle })),
    menuItem("contribute", "Contribute", () => h(DocAdd, { style: IconStyle })),
    // menuItem("login", "Login", () => h(People, { style: IconStyle })),
    menuItem("review", "Review", () => h(Inspection, { style: IconStyle })),
];

function menuItem(uri: string, label: string, icon: any): MenuOption {
    return {
        label: () =>
            h(RouterLink, { to: { name: uri } }, { default: () => label }),
        key: uri,
        icon: icon,
    };
}

const IconStyle = {
    height: "24px",
    width: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
