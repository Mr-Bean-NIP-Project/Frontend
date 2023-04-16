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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mantine_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mantine/core */ \"./node_modules/@mantine/core/esm/index.js\");\n/* harmony import */ var _tabler_icons_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tabler/icons-react */ \"./node_modules/@tabler/icons-react/dist/esm/tabler-icons-react.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst useStyles = (0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.createStyles)((theme)=>({\n        header: {\n            paddingBottom: theme.spacing.md,\n            marginBottom: \"calc(\".concat(theme.spacing.md, \" * 1.5)\"),\n            borderBottom: \"\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.rem)(1), \" solid \").concat(theme.colorScheme === \"dark\" ? theme.colors.dark[4] : theme.colors.gray[2])\n        },\n        footer: {\n            paddingTop: theme.spacing.md,\n            marginTop: theme.spacing.md,\n            borderTop: \"\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.rem)(1), \" solid \").concat(theme.colorScheme === \"dark\" ? theme.colors.dark[4] : theme.colors.gray[2])\n        },\n        link: {\n            ...theme.fn.focusStyles(),\n            display: \"flex\",\n            alignItems: \"center\",\n            textDecoration: \"none\",\n            fontSize: theme.fontSizes.sm,\n            color: theme.colorScheme === \"dark\" ? theme.colors.dark[1] : theme.colors.gray[7],\n            padding: \"\".concat(theme.spacing.xs, \" \").concat(theme.spacing.sm),\n            borderRadius: theme.radius.sm,\n            fontWeight: 500,\n            \"&:hover\": {\n                backgroundColor: theme.colorScheme === \"dark\" ? theme.colors.dark[6] : theme.colors.gray[0],\n                color: theme.colorScheme === \"dark\" ? theme.white : theme.black,\n                [\"& .\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.getStylesRef)(\"icon\"))]: {\n                    color: theme.colorScheme === \"dark\" ? theme.white : theme.black\n                }\n            }\n        },\n        linkIcon: {\n            ref: (0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.getStylesRef)(\"icon\"),\n            color: theme.colorScheme === \"dark\" ? theme.colors.dark[2] : theme.colors.gray[6],\n            marginRight: theme.spacing.sm\n        },\n        linkActive: {\n            \"&, &:hover\": {\n                backgroundColor: theme.fn.variant({\n                    variant: \"light\",\n                    color: theme.primaryColor\n                }).background,\n                color: theme.fn.variant({\n                    variant: \"light\",\n                    color: theme.primaryColor\n                }).color,\n                [\"& .\".concat((0,_mantine_core__WEBPACK_IMPORTED_MODULE_3__.getStylesRef)(\"icon\"))]: {\n                    color: theme.fn.variant({\n                        variant: \"light\",\n                        color: theme.primaryColor\n                    }).color\n                }\n            }\n        }\n    }));\nconst data = [\n    {\n        link: \"/products\",\n        label: \"Products\",\n        icon: _tabler_icons_react__WEBPACK_IMPORTED_MODULE_4__.IconPackage\n    },\n    {\n        link: \"/materials\",\n        label: \"Materials\",\n        icon: _tabler_icons_react__WEBPACK_IMPORTED_MODULE_4__.IconAtom\n    },\n    {\n        link: \"/suppliers\",\n        label: \"Suppliers\",\n        icon: _tabler_icons_react__WEBPACK_IMPORTED_MODULE_4__.IconBuildingStore\n    }\n];\nconst SideNavBar = ()=>{\n    _s();\n    const { classes , cx  } = useStyles();\n    const [active, setActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(data[0].label);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const links = data.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n            className: cx(classes.link, {\n                [classes.linkActive]: item.label === active\n            }),\n            href: item.link,\n            onClick: (event)=>{\n                event.preventDefault();\n                setActive(item.label);\n            },\n            legacyBehavior: true,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(item.icon, {\n                    className: classes.linkIcon,\n                    stroke: 1.5\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                    lineNumber: 107,\n                    columnNumber: 7\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    children: item.label\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                    lineNumber: 108,\n                    columnNumber: 7\n                }, undefined)\n            ]\n        }, item.label, true, {\n            fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n            lineNumber: 95,\n            columnNumber: 5\n        }, undefined));\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Navbar, {\n        height: \"100vh\",\n        width: {\n            sm: 300\n        },\n        p: \"md\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Navbar.Section, {\n            grow: true,\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Group, {\n                    className: classes.header,\n                    position: \"apart\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mantine_core__WEBPACK_IMPORTED_MODULE_3__.Text, {\n                        size: \"lg\",\n                        weight: 600,\n                        children: \"Mr Bean NIP Creator\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                        lineNumber: 116,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n                    lineNumber: 115,\n                    columnNumber: 9\n                }, undefined),\n                links\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n            lineNumber: 114,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\Admin\\\\Desktop\\\\Projects\\\\Mr-Bean-NIP-Project\\\\nip-frontend\\\\src\\\\components\\\\shared\\\\SideNavBar.tsx\",\n        lineNumber: 113,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SideNavBar, \"roQdYUoWN/0GT5lo2XQIdJKnPGQ=\", false, function() {\n    return [\n        useStyles,\n        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = SideNavBar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SideNavBar);\nvar _c;\n$RefreshReg$(_c, \"SideNavBar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkMsSUFBSTtRQUFJO1FBQUd3QyxHQUFFO2tCQUMzQyw0RUFBQ3pFLHlEQUFjO1lBQUMyRSxJQUFJOzs4QkFDbEIsOERBQUMxRSxnREFBS0E7b0JBQUM4RCxXQUFXVCxRQUFRM0MsTUFBTTtvQkFBRWlFLFVBQVM7OEJBQ3pDLDRFQUFDeEUsK0NBQUlBO3dCQUFDeUUsTUFBSzt3QkFBS0MsUUFBUTtrQ0FBSzs7Ozs7Ozs7Ozs7Z0JBSTlCbkI7Ozs7Ozs7Ozs7OztBQUlUO0dBbkNNTjs7UUFDb0I1QztRQUVURCxrREFBU0E7OztLQUhwQjZDO0FBcUNOLCtEQUFlQSxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3NoYXJlZC9TaWRlTmF2QmFyLnRzeD8yY2E4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlU3R5bGVzLFxyXG4gIE5hdmJhcixcclxuICBHcm91cCxcclxuICBnZXRTdHlsZXNSZWYsXHJcbiAgcmVtLFxyXG4gIFRleHQsXHJcbn0gZnJvbSBcIkBtYW50aW5lL2NvcmVcIjtcclxuaW1wb3J0IHsgSWNvblBhY2thZ2UsIEljb25BdG9tLCBJY29uQnVpbGRpbmdTdG9yZSB9IGZyb20gXCJAdGFibGVyL2ljb25zLXJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcblxyXG5jb25zdCB1c2VTdHlsZXMgPSBjcmVhdGVTdHlsZXMoKHRoZW1lKSA9PiAoe1xyXG4gIGhlYWRlcjoge1xyXG4gICAgcGFkZGluZ0JvdHRvbTogdGhlbWUuc3BhY2luZy5tZCxcclxuICAgIG1hcmdpbkJvdHRvbTogYGNhbGMoJHt0aGVtZS5zcGFjaW5nLm1kfSAqIDEuNSlgLFxyXG4gICAgYm9yZGVyQm90dG9tOiBgJHtyZW0oMSl9IHNvbGlkICR7XHJcbiAgICAgIHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIiA/IHRoZW1lLmNvbG9ycy5kYXJrWzRdIDogdGhlbWUuY29sb3JzLmdyYXlbMl1cclxuICAgIH1gLFxyXG4gIH0sXHJcblxyXG4gIGZvb3Rlcjoge1xyXG4gICAgcGFkZGluZ1RvcDogdGhlbWUuc3BhY2luZy5tZCxcclxuICAgIG1hcmdpblRvcDogdGhlbWUuc3BhY2luZy5tZCxcclxuICAgIGJvcmRlclRvcDogYCR7cmVtKDEpfSBzb2xpZCAke1xyXG4gICAgICB0aGVtZS5jb2xvclNjaGVtZSA9PT0gXCJkYXJrXCIgPyB0aGVtZS5jb2xvcnMuZGFya1s0XSA6IHRoZW1lLmNvbG9ycy5ncmF5WzJdXHJcbiAgICB9YCxcclxuICB9LFxyXG5cclxuICBsaW5rOiB7XHJcbiAgICAuLi50aGVtZS5mbi5mb2N1c1N0eWxlcygpLFxyXG4gICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxyXG4gICAgdGV4dERlY29yYXRpb246IFwibm9uZVwiLFxyXG4gICAgZm9udFNpemU6IHRoZW1lLmZvbnRTaXplcy5zbSxcclxuICAgIGNvbG9yOlxyXG4gICAgICB0aGVtZS5jb2xvclNjaGVtZSA9PT0gXCJkYXJrXCJcclxuICAgICAgICA/IHRoZW1lLmNvbG9ycy5kYXJrWzFdXHJcbiAgICAgICAgOiB0aGVtZS5jb2xvcnMuZ3JheVs3XSxcclxuICAgIHBhZGRpbmc6IGAke3RoZW1lLnNwYWNpbmcueHN9ICR7dGhlbWUuc3BhY2luZy5zbX1gLFxyXG4gICAgYm9yZGVyUmFkaXVzOiB0aGVtZS5yYWRpdXMuc20sXHJcbiAgICBmb250V2VpZ2h0OiA1MDAsXHJcblxyXG4gICAgXCImOmhvdmVyXCI6IHtcclxuICAgICAgYmFja2dyb3VuZENvbG9yOlxyXG4gICAgICAgIHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIlxyXG4gICAgICAgICAgPyB0aGVtZS5jb2xvcnMuZGFya1s2XVxyXG4gICAgICAgICAgOiB0aGVtZS5jb2xvcnMuZ3JheVswXSxcclxuICAgICAgY29sb3I6IHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIiA/IHRoZW1lLndoaXRlIDogdGhlbWUuYmxhY2ssXHJcblxyXG4gICAgICBbYCYgLiR7Z2V0U3R5bGVzUmVmKFwiaWNvblwiKX1gXToge1xyXG4gICAgICAgIGNvbG9yOiB0aGVtZS5jb2xvclNjaGVtZSA9PT0gXCJkYXJrXCIgPyB0aGVtZS53aGl0ZSA6IHRoZW1lLmJsYWNrLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBsaW5rSWNvbjoge1xyXG4gICAgcmVmOiBnZXRTdHlsZXNSZWYoXCJpY29uXCIpLFxyXG4gICAgY29sb3I6XHJcbiAgICAgIHRoZW1lLmNvbG9yU2NoZW1lID09PSBcImRhcmtcIlxyXG4gICAgICAgID8gdGhlbWUuY29sb3JzLmRhcmtbMl1cclxuICAgICAgICA6IHRoZW1lLmNvbG9ycy5ncmF5WzZdLFxyXG4gICAgbWFyZ2luUmlnaHQ6IHRoZW1lLnNwYWNpbmcuc20sXHJcbiAgfSxcclxuXHJcbiAgbGlua0FjdGl2ZToge1xyXG4gICAgXCImLCAmOmhvdmVyXCI6IHtcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZS5mbi52YXJpYW50KHtcclxuICAgICAgICB2YXJpYW50OiBcImxpZ2h0XCIsXHJcbiAgICAgICAgY29sb3I6IHRoZW1lLnByaW1hcnlDb2xvcixcclxuICAgICAgfSkuYmFja2dyb3VuZCxcclxuICAgICAgY29sb3I6IHRoZW1lLmZuLnZhcmlhbnQoeyB2YXJpYW50OiBcImxpZ2h0XCIsIGNvbG9yOiB0aGVtZS5wcmltYXJ5Q29sb3IgfSlcclxuICAgICAgICAuY29sb3IsXHJcbiAgICAgIFtgJiAuJHtnZXRTdHlsZXNSZWYoXCJpY29uXCIpfWBdOiB7XHJcbiAgICAgICAgY29sb3I6IHRoZW1lLmZuLnZhcmlhbnQoeyB2YXJpYW50OiBcImxpZ2h0XCIsIGNvbG9yOiB0aGVtZS5wcmltYXJ5Q29sb3IgfSlcclxuICAgICAgICAgIC5jb2xvcixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSkpO1xyXG5cclxuY29uc3QgZGF0YSA9IFtcclxuICB7IGxpbms6IFwiL3Byb2R1Y3RzXCIsIGxhYmVsOiBcIlByb2R1Y3RzXCIsIGljb246IEljb25QYWNrYWdlIH0sXHJcbiAgeyBsaW5rOiBcIi9tYXRlcmlhbHNcIiwgbGFiZWw6IFwiTWF0ZXJpYWxzXCIsIGljb246IEljb25BdG9tIH0sXHJcbiAgeyBsaW5rOiBcIi9zdXBwbGllcnNcIiwgbGFiZWw6IFwiU3VwcGxpZXJzXCIsIGljb246IEljb25CdWlsZGluZ1N0b3JlIH0sXHJcbl07XHJcblxyXG5jb25zdCBTaWRlTmF2QmFyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHsgY2xhc3NlcywgY3ggfSA9IHVzZVN0eWxlcygpO1xyXG4gIGNvbnN0IFthY3RpdmUsIHNldEFjdGl2ZV0gPSB1c2VTdGF0ZShkYXRhWzBdLmxhYmVsKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgY29uc3QgbGlua3MgPSBkYXRhLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgPGFcclxuICAgICAgY2xhc3NOYW1lPXtjeChjbGFzc2VzLmxpbmssIHtcclxuICAgICAgICBbY2xhc3Nlcy5saW5rQWN0aXZlXTogaXRlbS5sYWJlbCA9PT0gYWN0aXZlLFxyXG4gICAgICB9KX1cclxuICAgICAgaHJlZj17aXRlbS5saW5rfVxyXG4gICAgICBrZXk9e2l0ZW0ubGFiZWx9XHJcbiAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgc2V0QWN0aXZlKGl0ZW0ubGFiZWwpO1xyXG4gICAgICB9fVxyXG4gICAgICBsZWdhY3lCZWhhdmlvclxyXG4gICAgPlxyXG4gICAgICA8aXRlbS5pY29uIGNsYXNzTmFtZT17Y2xhc3Nlcy5saW5rSWNvbn0gc3Ryb2tlPXsxLjV9IC8+XHJcbiAgICAgIDxzcGFuPntpdGVtLmxhYmVsfTwvc3Bhbj5cclxuICAgIDwvYT5cclxuICApKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxOYXZiYXIgaGVpZ2h0PVwiMTAwdmhcIiB3aWR0aD17eyBzbTogMzAwIH19IHA9XCJtZFwiPlxyXG4gICAgICA8TmF2YmFyLlNlY3Rpb24gZ3Jvdz5cclxuICAgICAgICA8R3JvdXAgY2xhc3NOYW1lPXtjbGFzc2VzLmhlYWRlcn0gcG9zaXRpb249XCJhcGFydFwiPlxyXG4gICAgICAgICAgPFRleHQgc2l6ZT1cImxnXCIgd2VpZ2h0PXs2MDB9PlxyXG4gICAgICAgICAgICBNciBCZWFuIE5JUCBDcmVhdG9yXHJcbiAgICAgICAgICA8L1RleHQ+XHJcbiAgICAgICAgPC9Hcm91cD5cclxuICAgICAgICB7bGlua3N9XHJcbiAgICAgIDwvTmF2YmFyLlNlY3Rpb24+XHJcbiAgICA8L05hdmJhcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2lkZU5hdkJhcjtcclxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiY3JlYXRlU3R5bGVzIiwiTmF2YmFyIiwiR3JvdXAiLCJnZXRTdHlsZXNSZWYiLCJyZW0iLCJUZXh0IiwiSWNvblBhY2thZ2UiLCJJY29uQXRvbSIsIkljb25CdWlsZGluZ1N0b3JlIiwidXNlUm91dGVyIiwidXNlU3R5bGVzIiwidGhlbWUiLCJoZWFkZXIiLCJwYWRkaW5nQm90dG9tIiwic3BhY2luZyIsIm1kIiwibWFyZ2luQm90dG9tIiwiYm9yZGVyQm90dG9tIiwiY29sb3JTY2hlbWUiLCJjb2xvcnMiLCJkYXJrIiwiZ3JheSIsImZvb3RlciIsInBhZGRpbmdUb3AiLCJtYXJnaW5Ub3AiLCJib3JkZXJUb3AiLCJsaW5rIiwiZm4iLCJmb2N1c1N0eWxlcyIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwidGV4dERlY29yYXRpb24iLCJmb250U2l6ZSIsImZvbnRTaXplcyIsInNtIiwiY29sb3IiLCJwYWRkaW5nIiwieHMiLCJib3JkZXJSYWRpdXMiLCJyYWRpdXMiLCJmb250V2VpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwid2hpdGUiLCJibGFjayIsImxpbmtJY29uIiwicmVmIiwibWFyZ2luUmlnaHQiLCJsaW5rQWN0aXZlIiwidmFyaWFudCIsInByaW1hcnlDb2xvciIsImJhY2tncm91bmQiLCJkYXRhIiwibGFiZWwiLCJpY29uIiwiU2lkZU5hdkJhciIsImNsYXNzZXMiLCJjeCIsImFjdGl2ZSIsInNldEFjdGl2ZSIsInJvdXRlciIsImxpbmtzIiwibWFwIiwiaXRlbSIsImEiLCJjbGFzc05hbWUiLCJocmVmIiwib25DbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJsZWdhY3lCZWhhdmlvciIsInN0cm9rZSIsInNwYW4iLCJoZWlnaHQiLCJ3aWR0aCIsInAiLCJTZWN0aW9uIiwiZ3JvdyIsInBvc2l0aW9uIiwic2l6ZSIsIndlaWdodCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/shared/SideNavBar.tsx\n"));

/***/ })

});