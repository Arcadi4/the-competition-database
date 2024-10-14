import { DocAdd, HomeTwo, Info, People, Search } from "@icon-park/vue-next";
import { MenuOption } from "naive-ui";
import { h } from "vue";
import { RouterLink } from "vue-router";

export const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                { to: { name: "timeline" } },
                { default: () => "Timeline" }
            ),
        key: "timeline",
        icon: () =>
            h(HomeTwo, {
                style: IconStyle,
            }),
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: { name: "search" } },
                { default: () => "Search" }
            ),

        key: "search",
        icon: () =>
            h(Search, {
                style: IconStyle,
            }),
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: { name: "about" } },
                { default: () => "About" }
            ),
        key: "about",
        icon: () =>
            h(Info, {
                style: IconStyle,
            }),
    },
    {
        label: () =>
            h(
                RouterLink,
                { to: { name: "contribute" } },
                { default: () => "Contribute" }
            ),
        key: "contribute",
        icon: () =>
            h(DocAdd, {
                style: IconStyle,
            }),
    },
    {
        label: () => h(RouterLink),
        key: "login",
        icon: () =>
            h(People, {
                style: IconStyle,
            }),
    },
];

const IconStyle = {
    height: "24px",
    width: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
