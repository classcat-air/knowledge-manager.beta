import React, { useEffect, useRef, useState } from "react";
import {
  AtSign,
  BookOpen,
  GitHub,
  LogOut,
  Menu,
  Package,
  Plus,
  Shield,
  Tool,
  X,
} from "react-feather";
import IndexCount from "./IndexCount";
import LLMStatus from "./LLMStatus";
import NewWorkspaceModal, {
  useNewWorkspaceModal,
} from "../Modals/NewWorkspace";
import ActiveWorkspaces from "./ActiveWorkspaces";
import paths from "../../utils/paths";
import Discord from "../Icons/Discord";
import useUser from "../../hooks/useUser";
import { userFromStorage } from "../../utils/request";
import { AUTH_TOKEN, AUTH_USER } from "../../utils/constants";
import useLogo from "../../hooks/useLogo";
import SettingsOverlay, { useSystemSettingsOverlay } from "./SettingsOverlay";

export default function Sidebar() {
  const { logo } = useLogo();
  const sidebarRef = useRef(null);
  const { showOverlay } = useSystemSettingsOverlay();
  const {
    showing: showingNewWsModal,
    showModal: showNewWsModal,
    hideModal: hideNewWsModal,
  } = useNewWorkspaceModal();

  return (
    <>
      <div
        ref={sidebarRef}
        style={{ height: "calc(100% - 32px)" }}
        className="relative transition-all duration-500 relative m-[16px] rounded-[26px] bg-white dark:bg-black-900 min-w-[15.5%] p-[18px] "
      >
        <SettingsOverlay />
        <div className="w-full h-full flex flex-col overflow-x-hidden items-between">
          {/* Header Information */}
          <div className="flex w-full items-center justify-between">
            <div className="flex shrink-0 max-w-[50%] items-center justify-start">
              <img
                src={logo}
                alt="Logo"
                className="rounded max-h-[40px]"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="flex gap-x-2 items-center text-slate-500">
              <AdminHome />
              <SettingsButton onClick={showOverlay} />
            </div>
          </div>

          {/* Primary Body */}
          <div className="h-[100%] flex flex-col w-full justify-between pt-4 overflow-y-hidden">
            <div className="h-auto sidebar-items dark:sidebar-items">
              <div className="flex flex-col gap-y-4 h-[65vh] pb-8 overflow-y-scroll no-scroll">
                <div className="flex gap-x-2 items-center justify-between">
                  <button
                    onClick={showNewWsModal}
                    className="flex flex-grow w-[75%] h-[36px] gap-x-2 py-[5px] px-4 border border-slate-400 rounded-lg text-slate-800 dark:text-slate-200 justify-start items-center hover:bg-slate-100 dark:hover:bg-stone-900"
                  >
                    <Plus className="h-4 w-4" />
                    <p className="text-slate-800 dark:text-slate-200 text-xs leading-loose font-semibold">
                      新しいワークスペース
                    </p>
                  </button>
                </div>
                <ActiveWorkspaces />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-y-2">
                <div className="w-full flex items-center justify-between">
                  <LLMStatus />
                  <IndexCount />
                </div>         
                <LogoutButton />
              </div>

              {/* Footer */}
              <div className="flex items-end justify-between mt-2">
                <div className="flex gap-x-1 items-center">
                  <a
                    href={paths.github()}
                    className="transition-all duration-300 p-2 rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 hover:bg-slate-800 hover:text-slate-200 dark:hover:text-slate-200"
                  >
                    <GitHub className="h-4 w-4 " />
                  </a>
                  <a
                    href={paths.docs()}
                    className="transition-all duration-300 p-2 rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 hover:bg-slate-800 hover:text-slate-200 dark:hover:text-slate-200"
                  >
                    <BookOpen className="h-4 w-4 " />
                  </a>
                </div>
                <a
                  href={paths.mailToClassCat()}
                  className="transition-all duration-300 text-xs text-slate-500 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  @ClassCat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showingNewWsModal && <NewWorkspaceModal hideModal={hideNewWsModal} />}
    </>
  );
}

export function SidebarMobileHeader() {
  const { logo } = useLogo();
  const sidebarRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showBgOverlay, setShowBgOverlay] = useState(false);
  const { showOverlay } = useSystemSettingsOverlay();
  const {
    showing: showingNewWsModal,
    showModal: showNewWsModal,
    hideModal: hideNewWsModal,
  } = useNewWorkspaceModal();

  useEffect(() => {
    // Darkens the rest of the screen
    // when sidebar is open.
    function handleBg() {
      if (showSidebar) {
        setTimeout(() => {
          setShowBgOverlay(true);
        }, 300);
      } else {
        setShowBgOverlay(false);
      }
    }
    handleBg();
  }, [showSidebar]);

  return (
    <>
      <div className="flex justify-between relative top-0 left-0 w-full rounded-b-lg px-2 pb-4 bg-white dark:bg-black-900 text-slate-800 dark:text-slate-200">
        <button
          onClick={() => setShowSidebar(true)}
          className="rounded-md bg-stone-200 p-2 flex items-center justify-center text-slate-800 hover:bg-stone-300 group dark:bg-stone-800 dark:text-slate-200 dark:hover:bg-stone-900 dark:border dark:border-stone-800"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex shrink-0 w-fit items-center justify-start">
          <img
            src={logo}
            alt="Logo"
            className="rounded w-full max-h-[40px]"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div
        style={{
          transform: showSidebar ? `translateX(0vw)` : `translateX(-100vw)`,
        }}
        className={`z-99 fixed top-0 left-0 transition-all duration-500 w-[100vw] h-[100vh]`}
      >
        <div
          className={`${
            showBgOverlay
              ? "transition-all opacity-1"
              : "transition-none opacity-0"
          }  duration-500 fixed top-0 left-0 bg-black-900 bg-opacity-75 w-screen h-screen`}
          onClick={() => setShowSidebar(false)}
        />
        <div
          ref={sidebarRef}
          className="relative h-[100vh] fixed top-0 left-0  rounded-r-[26px] bg-white dark:bg-black-900 w-[80%] p-[18px] "
        >
          <SettingsOverlay />
          <div className="w-full h-full flex flex-col overflow-x-hidden items-between">
            {/* Header Information */}
            <div className="flex w-full items-center justify-between gap-x-4">
              <div className="flex shrink-1 w-fit items-center justify-start">
                <img
                  src={logo}
                  alt="Logo"
                  className="rounded w-full max-h-[40px]"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="flex gap-x-2 items-center text-slate-500 shink-0">
                <AdminHome />
                <SettingsButton onClick={showOverlay} />
              </div>
            </div>

            {/* Primary Body */}
            <div className="h-full flex flex-col w-full justify-between pt-4 overflow-y-hidden ">
              <div className="h-auto md:sidebar-items md:dark:sidebar-items">
                <div
                  style={{ height: "calc(100vw - -3rem)" }}
                  className=" flex flex-col gap-y-4 pb-8 overflow-y-scroll no-scroll"
                >
                  <div className="flex gap-x-2 items-center justify-between">
                    <button
                      onClick={showNewWsModal}
                      className="flex flex-grow w-[75%] h-[36px] gap-x-2 py-[5px] px-4 border border-slate-400 rounded-lg text-slate-800 dark:text-slate-200 justify-start items-center hover:bg-slate-100 dark:hover:bg-stone-900"
                    >
                      <Plus className="h-4 w-4" />
                      <p className="text-slate-800 dark:text-slate-200 text-xs leading-loose font-semibold">
                        新しいワークスペース
                      </p>
                    </button>
                  </div>
                  <ActiveWorkspaces />
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-y-2">
                  <div className="w-full flex items-center justify-between">
                    <LLMStatus />
                    <IndexCount />
                  </div>
                  <LogoutButton />
                </div>

                {/* Footer */}
                <div className="flex items-end justify-between mt-2">
                  <div className="flex gap-x-1 items-center">
                    <a
                      href={paths.github()}
                      className="transition-all duration-300 p-2 rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 hover:bg-slate-800 hover:text-slate-200 dark:hover:text-slate-200"
                    >
                      <GitHub className="h-4 w-4 " />
                    </a>
                    <a
                      href={paths.docs()}
                      className="transition-all duration-300 p-2 rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 hover:bg-slate-800 hover:text-slate-200 dark:hover:text-slate-200"
                    >
                      <BookOpen className="h-4 w-4 " />
                    </a>
                  </div>
                  <a
                    href={paths.mailToClassCat()}
                    className="transition-all duration-300 text-xs text-slate-500 dark:text-slate-600 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    @ClassCat
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showingNewWsModal && <NewWorkspaceModal hideModal={hideNewWsModal} />}
      </div>
    </>
  );
}

function AdminHome() {
  const { user } = useUser();
  if (!user || user?.role !== "admin") return null;
  return (
    <a
      href={paths.admin.system()}
      className="transition-all duration-300 p-2 rounded-full bg-slate-200 text-slate-400 dark:bg-stone-800 hover:bg-slate-800 hover:text-slate-200 dark:hover:text-slate-200"
    >
      <Shield className="h-4 w-4" />
    </a>
  );
}

function LogoutButton() {
  console.log(">> debug > IN : LogoutButton (frontend/src/components/Sidebar/index.jsx")
  if (!window.localStorage.getItem(AUTH_USER)) {
    console.log("step1")
    return null;
  }
  const user = userFromStorage();
  if (!user.username) {
    console.log("step2")
    return null;
  }
  return (
    <button
      onClick={() => {
        window.localStorage.removeItem(AUTH_USER);
        window.localStorage.removeItem(AUTH_TOKEN);
        window.location.replace(paths.home());
      }}
      className="flex flex-grow w-[100%] h-[36px] gap-x-2 py-[5px] px-4 border border-slate-400 dark:border-transparent rounded-lg text-slate-800 dark:text-slate-200 justify-center items-center hover:bg-slate-100 dark:bg-stone-800 dark:hover:bg-stone-900"
    >
      <LogOut className="h-4 w-4" />
      <p className="text-slate-800 dark:text-slate-200 text-xs leading-loose font-semibold">
        {user.username} をログアウト
      </p>
    </button>
  );
}

function SettingsButton({ onClick }) {
  const { user } = useUser();

  if (!!user && user?.role !== "admin") return null;
  return (
    <button
      onClick={onClick}
      className="transition-all duration-300 p-2 rounded-full bg-slate-200 text-slate-400 dark:bg-stone-800 hover:bg-slate-800 hover:text-slate-200 dark:hover:text-slate-200"
    >
      <Tool className="h-4 w-4 " />
    </button>
  );
}

function ManagedHosting() {
  if (window.location.origin.includes(".useanything.com")) return null;
  return (
    <a
      href={paths.hosting()}
      target="_blank"
      className="flex flex-grow w-[100%] h-[36px] gap-x-2 py-[5px] px-4 border border-slate-400 dark:border-transparent rounded-lg text-slate-800 dark:text-slate-200 justify-center items-center hover:bg-slate-100 dark:bg-stone-800 dark:hover:bg-stone-900"
    >
      <Package className="h-4 w-4" />
      <p className="text-slate-800 dark:text-slate-200 text-xs leading-loose font-semibold">
        Managed cloud hosting
      </p>
    </a>
  );
}
