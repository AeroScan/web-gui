/* REACT */
import { useState, useEffect, useRef } from "react";

/* THREEJS */
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/* HOOKS */
import useCloud from "../../hooks/useCloud";
import useInterfaceTour from "../../hooks/useInterfaceTour";

/* UTILS */
import { useTranslation } from "react-i18next";


const PotreeViewer = () => {
  const potree: any = (window as any).Potree;
  const potreeRenderArea = useRef(null);
  const { viewerRef } = useInterfaceTour();
  const { sidebarRef } = useInterfaceTour();

  const { i18n } = useTranslation();
  const { cloudId, sessionId } = useCloud();

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
          `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_FILES_PORT}/clouds/${sessionId}/${cloudId}/output/metadata.json`
        )
        .then(
          (e: any) => {
            viewer.scene.scenePointCloud.remove(viewer.scene.pointclouds[0]);
            viewer.scene.pointclouds.pop();
            viewer.scene.addPointCloud(e.pointcloud);
            const { material } = e.pointcloud;
            material.size = 1;
            material.pointSizeType = potree.PointSizeType.ADAPTIVE;
            viewer.fitToScreen();
          },
          (error: unknown) => console.error(`ERROR: ${error}`)
        );
    }
  }, [sessionId, cloudId, potree, viewerConfigured, viewer]);

  return (
    <div id="potree-root" ref={viewerRef} className=" bg-black !h-[calc(100vh-232px)] w-full">
      <div
        ref={potreeRenderArea}
        id="potree_render_area"
        className="!h-[calc(100vh-232px)] w-full !top-[168px]"
      />
      <div ref={sidebarRef} id="potree_sidebar_container" className="!h-[calc(100vh-233px)]" />
    </div>
  );
};

export default PotreeViewer;
