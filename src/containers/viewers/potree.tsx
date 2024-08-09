/* REACT */
import { useState, useEffect, useRef } from "react";

/* THREEJS */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* HOOKS */
import useCloud from "../../hooks/useCloud";
import useAeroScan from "../../hooks/processing/useAeroScan";
import useEfficientRansac from "../../hooks/processing/useEfficientRansac";

/* UTILS */
import { useTranslation } from "react-i18next";

const PotreeViewer = () => {
  const potree: any = (window as any).Potree;
  const potreeRenderArea = useRef(null);

  const { i18n, t } = useTranslation();
  const { cloudId, sessionId, viewType, annotations } = useCloud();
  const { applied: isEfficientRansacApplied } = useEfficientRansac();
  const { applied: isAeroScanApplied } = useAeroScan();

  const [viewer, setViewer] = useState<any>(null);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [viewerConfigured, setViewerConfigured] = useState<boolean>(false);

  useEffect(() => {
    if (potree && !pageLoaded) {
      const viewerElem = potreeRenderArea.current;
      setViewer(new potree.Viewer(viewerElem));
      setPageLoaded(true);
    }
  }, [potree, pageLoaded]);

  useEffect(() => {
    if (viewer && !viewerConfigured) {
      viewer.setEDLEnabled(false);
      viewer.setFOV(60);
      viewer.setPointBudget(1 * 1000 * 1000);
      viewer.loadSettingsFromURL();

      viewer.loadGUI(() => {
        viewer.toggleSidebar();
        console.log(i18n.language);
        viewer.setLanguage(i18n.language);
      });

      viewer.setClassifications([]);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.01,
        10000000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(0x000000, 0);

      const controls = new OrbitControls(camera, renderer.domElement);
      scene.add(new THREE.AxesHelper(10000));
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      setViewerConfigured(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewer, viewerConfigured]);

  useEffect(() => {
    if (cloudId && potree && viewerConfigured && viewer) {
      potree
        .loadPointCloud(
          `${process.env.REACT_APP_SERVER_URL}:${
            process.env.REACT_APP_FILES_PORT
          }/clouds/${sessionId}/${cloudId}/output${
            isEfficientRansacApplied || isAeroScanApplied ? `_${viewType}` : ""
          }/metadata.json`
        )
        .then(
          (e: any) => {
            // Reset viewer
            viewer.scene.annotations.removeAllChildren();
            viewer.scene.scenePointCloud.remove(viewer.scene.pointclouds[0]);
            viewer.scene.pointclouds.pop();

            // Adds point cloud
            viewer.scene.addPointCloud(e.pointcloud);

            // Adds material and annotations
            const { material } = e.pointcloud;
            material.size = 1;
            material.pointSizeType = potree.PointSizeType.ADAPTIVE;
            if (isEfficientRansacApplied) {
              if (viewType === "instances") {
                annotations.forEach((annotation) => {
                  viewer.scene.annotations.add(
                    new potree.Annotation({
                      title: annotation.title,
                      position: annotation.position,
                      description: annotation.description,
                      cameraPosition: annotation.position,
                      cameraTarget: annotation.position,
                    })
                  );
                });
              } else if (viewType === "types") {
                material.activeAttributeName = "classification";
              }
            }

            viewer.fitToScreen();
          },
          (error: unknown) => console.error(`ERROR: ${error}`)
        );
    }
  }, [
    viewer,
    potree,
    cloudId,
    viewType,
    sessionId,
    annotations,
    viewerConfigured,
    isEfficientRansacApplied,
    isAeroScanApplied,
  ]);

  useEffect(() => {
    if (viewer) {
      if (
        (isEfficientRansacApplied || isAeroScanApplied) &&
        viewType === "types"
      ) {
        viewer.setClassifications([
          {
            visible: true,
            name: t("common.unlabeled"),
            color: [0, 0, 0, 1],
          },
          {
            visible: true,
            name: t("common.plane"),
            color: [1, 0, 0, 1],
          },
          {
            visible: true,
            name: t("common.cylinder"),
            color: [0, 0, 1, 1],
          },
          {
            visible: true,
            name: t("common.cone"),
            color: [1, 1, 0, 1],
          },
          {
            visible: true,
            name: t("common.sphere"),
            color: [0, 0.5, 0, 1],
          },
        ]);
      } else {
        viewer.setClassifications([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEfficientRansacApplied, isAeroScanApplied, viewer]);

  useEffect(() => {
    if (viewer) {
      viewer.setLanguage(i18n.language);
    }
  }, [viewer, i18n.language]);

  return (
    <div id="potree-root" className="bg-black !h-[calc(100vh-232px)] w-full">
      <div
        ref={potreeRenderArea}
        id="potree_render_area"
        className="!h-[calc(100vh-232px)] w-full !top-[168px]"
      />
      <div id="potree_sidebar_container" className="!h-[calc(100vh-233px)]" />
    </div>
  );
};

export default PotreeViewer;

