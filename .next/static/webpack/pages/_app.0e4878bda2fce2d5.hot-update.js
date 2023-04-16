"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/components/shared/SideNavBar.tsx":
/*!**********************************************!*\
  !*** ./src/components/shared/SideNavBar.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mantine/core */ \"./node_modules/@mantine/core/esm/index.js\");\n/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tabler/icons-react */ \"./node_modules/@tabler/icons-react/dist/esm/tabler-icons-react.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nconst useStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_4__.createStyles)((theme)=>({\n        header: {\n            paddingBottom: theme.spacing.md,\n            marginBottom: \"calc(\".concat(theme.spacing.md, \" * 1.5)\"),\n            borderBottom: \"\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_4__.rem)(1), \" solid \").concat(theme.colorScheme === \"dark\" ? theme.colors.dark[4] : theme.colors.gray[2])\n        },\n        footer: {\n            paddingTop: theme.spacing.md,\n            marginTop: theme.spacing.md,\n            borderTop: \"\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_4__.rem)(1), \" solid \").concat(theme.colorScheme === \"dark\" ? theme.colors.dark[4] : theme.colors.gray[2])\n        },\n        link: {\n            ...theme.fn.focusStyles(),\n            display: \"flex\",\n            alignItems: \"center\",\n            textDecoration: \"none\",\n            fontSize: theme.fontSizes.sm,\n            color: theme.colorScheme === \"dark\" ? theme.colors.dark[1] : theme.colors.gray[7],\n            padding: \"\".concat(theme.spacing.xs, \" \").concat(theme.spacing.sm),\n            borderRadius: theme.radius.sm,\n            fontWeight: 500,\n            \"&:hover\": {\n                backgroundColor: theme.colorScheme === \"dark\" ? theme.colors.dark[6] : theme.colors.gray[0],\n                color: theme.colorScheme === \"dark\" ? theme.white : theme.black,\n                [\"& .\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_4__.getStylesRef)(\"icon\"))]: {\n                    color: theme.colorScheme === \"dark\" ? theme.white : theme.black\n                }\n            }\n        },\n        linkIcon: {\n            ref: (0,_mantine_core__WEBPACK_IMPORTED_MODULE_4__.getStylesRef)(\"icon\"),\n            color: theme.colorScheme === \"dark\" ? theme.colors.dark[2] : theme.colors.gray[6],\n            marginRight: theme.spacing.sm\n        },\n        linkActive: {\n            \"&, &:hover\": {\n                backgroundColor: theme.fn.variant({\n                    variant: \"light\",\n                    color: theme.primaryColor\n                }).background,\n                color: theme.fn.variant({\n                    variant: \"light\",\n                    color: theme.primaryColor\n                }).color,\n                [\"& .\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_4__.getStylesRef)(\"icon\"))]: {\n                    color: theme.fn.variant({\n                        variant: \"light\",\n                        color: theme.primaryColor\n                    }).color\n                }\n            }\n        }\n    }));\nconst data = [\n    {\n        link: \"/products\",\n        label: \"Products\",\n        icon: _tabler_icons_react__WEBPACK_IMPORTED_MODULE_5__.IconPackage\n    },\n    {\n        link: \"/materials\",\n        label: \"Materials\",\n        icon: _tabler_icons_react__WEBPACK_IMPORTED_MODULE_5__.IconAtom\n    },\n    {\n        link: \"/suppliers\",\n        label: \"Suppliers\",\n        icon: _tabler_icons_react__WEBPACK_IMPORTED_MODULE_5__.IconBuildingStore\n    }\n];\nconst SideNavBar = ()=>{\n    _s();\n    const { classes , cx  } = useStyles();\n    const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data[0].label);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const links = data.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {\n            href: item.link,\n            passHref: true,\n            legacyBehavior: true,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                className: cx(classes.link, {\n                    [classes.linkActive]: item.label === active\n                }),\n                href: item.link,\n                onClick: (event)=>{\n                    event.preventDefault();\n                    setActive(item.label);\n                },\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(item.icon, {\n                        className: classes.linkIcon,\n                        stroke: 1.5\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                        lineNumber: 107,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        children: item.label\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                        lineNumber: 108,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, item.label, true, {\n                fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                lineNumber: 96,\n                columnNumber: 7\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n            lineNumber: 95,\n            columnNumber: 5\n        }, undefined));\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Navbar, {\n        height: \"100vh\",\n        width: {\n            sm: 300\n        },\n        p: \"md\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Navbar.Section, {\n            grow: true,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Group, {\n                    className: classes.header,\n                    position: \"apart\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_4__.Text, {\n                        size: \"lg\",\n                        weight: 600,\n                        children: \"Mr Bean NIP Creator\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                        lineNumber: 117,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                    lineNumber: 116,\n                    columnNumber: 9\n                }, undefined),\n                links\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n            lineNumber: 115,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n        lineNumber: 114,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SideNavBar, \"roQdYUoWN/0GT5lo2XQIdJKnPGQ=\", false, function() {\n    return [\n        useStyles,\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = SideNavBar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SideNavBar);\nvar _c;\n$RefreshReg$(_c, \"SideNavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQUtWLEtBQUs7Ozs7Ozs7Ozs7SUFZckIscUJBQ0UsOERBQUNwRCxpREFBTUE7UUFBQ3lFLFFBQU87UUFBUUMsT0FBTztZQUFFeEMsSUFBSTtRQUFJO1FBQUd5QyxHQUFFO2tCQUMzQyw0RUFBQzNFLHlEQUFjO1lBQUM2RSxJQUFJOzs4QkFDbEIsOERBQUM1RSxnREFBS0E7b0JBQUNrRSxXQUFXWixRQUFRM0MsTUFBTTtvQkFBRWtFLFVBQVM7OEJBQ3pDLDRFQUFDMUUsK0NBQUlBO3dCQUFDMkUsTUFBSzt3QkFBS0MsUUFBUTtrQ0FBSzs7Ozs7Ozs7Ozs7Z0JBSTlCcEI7Ozs7Ozs7Ozs7OztBQUlUO0dBcENNTjs7UUFDb0I1QztRQUVURixrREFBU0E7OztLQUhwQjhDO0FBc0NOLCtEQUFlQSxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9TaWRlTmF2QmFyLnRzeD8yY2E4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlU3R5bGVzLFxyXG4gIE5hdmJhcixcclxuICBHcm91cCxcclxuICBnZXRTdHlsZXNSZWYsXHJcbiAgcmVtLFxyXG4gIFRleHQsXHJcbn0gZnJvbSBcIkBtYW50aW5lL2NvcmVcIjtcclxuaW1wb3J0IHsgSWNvblBhY2thZ2UsIEljb25BdG9tLCBJY29uQnVpbGRpbmdTdG9yZSB9IGZyb20gXCJAdGFibGVyL2ljb25zLXJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcblxyXG5jb25zdCB1c2VTdHlsZXMgPSBjcmVhdGVTdHlsZXMoKHRoZW1lKSA9PiAoe1xyXG4gIGhlYWRlcjoge1xyXG4gICAgcGFkZGluZ0JvdHRvbTogdGhlbWUuc3BhY2luZy5tZCxcclxuICAgIG1hcmdpbkJvdHRvbTogYGNhbGMoJHt0aGVtZS5zcGFjaW5nLm1kfSAqIDEuNSlgLFxyXG4gICAgYm9yZGVyQm90dG9tOiBgJHtyZW0oMSl9IHNvbGlkICR7XHJcbiAgICAgIHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIiA/IHRoZW1lLmNvbG9ycy5kYXJrWzRdIDogdGhlbWUuY29sb3JzLmdyYXlbMl1cclxuICAgIH1gLFxyXG4gIH0sXHJcblxyXG4gIGZvb3Rlcjoge1xyXG4gICAgcGFkZGluZ1RvcDogdGhlbWUuc3BhY2luZy5tZCxcclxuICAgIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZy5tZCxcclxuICAgIGJvcmRlclRvcDogYCR7cmVtKDEpfSBzb2xpZCAke1xyXG4gICAgICB0aGVtZS5jb2xvclNjaGVtZSA9PT0gXCJkYXJrXCIgPyB0aGVtZS5jb2xvcnMuZGFya1s0XSA6IHRoZW1lLmNvbG9ycy5ncmF5WzJdXHJcbiAgICB9YCxcclxuICB9LFxyXG5cclxuICBsaW5rOiB7XHJcbiAgICAuLi50aGVtZS5mbi5mb2N1c1N0eWxlcygpLFxyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxyXG4gICAgdGV4dERlY29yYXRpb246IFwibm9uZVwiLFxyXG4gICAgZm9udFNpemU6IHRoZW1lLmZvbnRTaXplcy5zbSxcclxuICAgIGNvbG9yOlxyXG4gICAgICB0aGVtZS5jb2xvclNjaGVtZSA9PT0gXCJkYXJrXCJcclxuICAgICAgICA/IHRoZW1lLmNvbG9ycy5kYXJrWzFdXHJcbiAgICAgICAgOiB0aGVtZS5jb2xvcnMuZ3JheVs3XSxcclxuICAgIHBhZGRpbmc6IGAke3RoZW1lLnNwYWNpbmcueHN9ICR7dGhlbWUuc3BhY2luZy5zbX1gLFxyXG4gICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMuc20sXHJcbiAgICBmb250V2VpZ2h0OiA1MDAsXHJcblxyXG4gICAgXCImOmhvdmVyXCI6IHtcclxuICAgICAgYmFja2dyb3VuZENvbG9yOlxyXG4gICAgICAgIHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIlxyXG4gICAgICAgICAgPyB0aGVtZS5jb2xvcnMuZGFya1s2XVxyXG4gICAgICAgICAgOiB0aGVtZS5jb2xvcnMuZ3JheVswXSxcclxuICAgICAgY29sb3I6IHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIiA/IHRoZW1lLndoaXRlIDogdGhlbWUuYmxhY2ssXHJcblxyXG4gICAgICBbYCYgLiR7Z2V0U3R5bGVzUmVmKFwiaWNvblwiKX1gXToge1xyXG4gICAgICAgIGNvbG9yOiB0aGVtZS5jb2xvclNjaGVtZSA9PT0gXCJkYXJrXCIgPyB0aGVtZS53aGl0ZSA6IHRoZW1lLmJsYWNrLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBsaW5rSWNvbjoge1xyXG4gICAgcmVmOiBnZXRTdHlsZXNSZWYoXCJpY29uXCIpLFxyXG4gICAgY29sb3I6XHJcbiAgICAgIHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIlxyXG4gICAgICAgID8gdGhlbWUuY29sb3JzLmRhcmtbMl1cclxuICAgICAgICA6IHRoZW1lLmNvbG9ycy5ncmF5WzZdLFxyXG4gICAgbWFyZ2luUmlnaHQ6IHRoZW1lLnNwYWNpbmcuc20sXHJcbiAgfSxcclxuXHJcbiAgbGlua0FjdGl2ZToge1xyXG4gICAgXCImLCAmOmhvdmVyXCI6IHtcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5mbi52YXJpYW50KHtcclxuICAgICAgICB2YXJpYW50OiBcImxpZ2h0XCIsXHJcbiAgICAgICAgY29sb3I6IHRoZW1lLnByaW1hcnlDb2xvcixcclxuICAgICAgfSkuYmFja2dyb3VuZCxcclxuICAgICAgY29sb3I6IHRoZW1lLmZuLnZhcmlhbnQoeyB2YXJpYW50OiBcImxpZ2h0XCIsIGNvbG9yOiB0aGVtZS5wcmltYXJ5Q29sb3IgfSlcclxuICAgICAgICAuY29sb3IsXHJcbiAgICAgIFtgJiAuJHtnZXRTdHlsZXNSZWYoXCJpY29uXCIpfWBdOiB7XHJcbiAgICAgICAgY29sb3I6IHRoZW1lLmZuLnZhcmlhbnQoeyB2YXJpYW50OiBcImxpZ2h0XCIsIGNvbG9yOiB0aGVtZS5wcmltYXJ5Q29sb3IgfSlcclxuICAgICAgICAgIC5jb2xvcixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSkpO1xyXG5cclxuY29uc3QgZGF0YSA9IFtcclxuICB7IGxpbms6IFwiL3Byb2R1Y3RzXCIsIGxhYmVsOiBcIlByb2R1Y3RzXCIsIGljb246IEljb25QYWNrYWdlIH0sXHJcbiAgeyBsaW5rOiBcIi9tYXRlcmlhbHNcIiwgbGFiZWw6IFwiTWF0ZXJpYWxzXCIsIGljb246IEljb25BdG9tIH0sXHJcbiAgeyBsaW5rOiBcIi9zdXBwbGllcnNcIiwgbGFiZWw6IFwiU3VwcGxpZXJzXCIsIGljb246IEljb25CdWlsZGluZ1N0b3JlIH0sXHJcbl07XHJcblxyXG5jb25zdCBTaWRlTmF2QmFyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHsgY2xhc3NlcywgY3ggfSA9IHVzZVN0eWxlcygpO1xyXG4gIGNvbnN0IFthY3RpdmUsIHNldEFjdGl2ZV0gPSB1c2VTdGF0ZShkYXRhWzBdLmxhYmVsKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgY29uc3QgbGlua3MgPSBkYXRhLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgPExpbmsgaHJlZj17aXRlbS5saW5rfSBwYXNzSHJlZiBsZWdhY3lCZWhhdmlvcj5cclxuICAgICAgPGFcclxuICAgICAgICBjbGFzc05hbWU9e2N4KGNsYXNzZXMubGluaywge1xyXG4gICAgICAgICAgW2NsYXNzZXMubGlua0FjdGl2ZV06IGl0ZW0ubGFiZWwgPT09IGFjdGl2ZSxcclxuICAgICAgICB9KX1cclxuICAgICAgICBocmVmPXtpdGVtLmxpbmt9XHJcbiAgICAgICAga2V5PXtpdGVtLmxhYmVsfVxyXG4gICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHNldEFjdGl2ZShpdGVtLmxhYmVsKTtcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPGl0ZW0uaWNvbiBjbGFzc05hbWU9e2NsYXNzZXMubGlua0ljb259IHN0cm9rZT17MS41fSAvPlxyXG4gICAgICAgIDxzcGFuPntpdGVtLmxhYmVsfTwvc3Bhbj5cclxuICAgICAgPC9hPlxyXG4gICAgPC9MaW5rPlxyXG4gICkpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPE5hdmJhciBoZWlnaHQ9XCIxMDB2aFwiIHdpZHRoPXt7IHNtOiAzMDAgfX0gcD1cIm1kXCI+XHJcbiAgICAgIDxOYXZiYXIuU2VjdGlvbiBncm93PlxyXG4gICAgICAgIDxHcm91cCBjbGFzc05hbWU9e2NsYXNzZXMuaGVhZGVyfSBwb3NpdGlvbj1cImFwYXJ0XCI+XHJcbiAgICAgICAgICA8VGV4dCBzaXplPVwibGdcIiB3ZWlnaHQ9ezYwMH0+XHJcbiAgICAgICAgICAgIE1yIEJlYW4gTklQIENyZWF0b3JcclxuICAgICAgICAgIDwvVGV4dD5cclxuICAgICAgICA8L0dyb3VwPlxyXG4gICAgICAgIHtsaW5rc31cclxuICAgICAgPC9OYXZiYXIuU2VjdGlvbj5cclxuICAgIDwvTmF2YmFyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWRlTmF2QmFyO1xyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJjcmVhdGVTdHlsZXMiLCJOYXZiYXIiLCJHcm91cCIsImdldFN0eWxlc1JlZiIsInJlbSIsIlRleHQiLCJJY29uUGFja2FnZSIsIkljb25BdG9tIiwiSWNvbkJ1aWxkaW5nU3RvcmUiLCJ1c2VSb3V0ZXIiLCJMaW5rIiwidXNlU3R5bGVzIiwidGhlbWUiLCJoZWFkZXIiLCJwYWRkaW5nQm90dG9tIiwic3BhY2luZyIsIm1kIiwibWFyZ2luQm90dG9tIiwiYm9yZGVyQm90dG9tIiwiY29sb3JTY2hlbWUiLCJjb2xvcnMiLCJkYXJrIiwiZ3JheSIsImZvb3RlciIsInBhZGRpbmdUb3AiLCJtYXJnaW5Ub3AiLCJib3JkZXJUb3AiLCJsaW5rIiwiZm4iLCJmb2N1c1N0eWxlcyIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwidGV4dERlY29yYXRpb24iLCJmb250U2l6ZSIsImZvbnRTaXplcyIsInNtIiwiY29sb3IiLCJwYWRkaW5nIiwieHMiLCJib3JkZXJSYWRpdXMiLCJyYWRpdXMiLCJmb250V2VpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwid2hpdGUiLCJibGFjayIsImxpbmtJY29uIiwicmVmIiwibWFyZ2luUmlnaHQiLCJsaW5rQWN0aXZlIiwidmFyaWFudCIsInByaW1hcnlDb2xvciIsImJhY2tncm91bmQiLCJkYXRhIiwibGFiZWwiLCJpY29uIiwiU2lkZU5hdkJhciIsImNsYXNzZXMiLCJjeCIsImFjdGl2ZSIsInNldEFjdGl2ZSIsInJvdXRlciIsImxpbmtzIiwibWFwIiwiaXRlbSIsImhyZWYiLCJwYXNzSHJlZiIsImxlZ2FjeUJlaGF2aW9yIiwiYSIsImNsYXNzTmFtZSIsIm9uQ2xpY2siLCJldmVudCIsInByZXZlbnREZWZhdWx0Iiwic3Ryb2tlIiwic3BhbiIsImhlaWdodCIsIndpZHRoIiwicCIsIlNlY3Rpb24iLCJncm93IiwicG9zaXRpb24iLCJzaXplIiwid2VpZ2h0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/shared/SideNavBar.tsx\n"));

/***/ })

});