/* REACT */
import { FC } from "react";

/* COMPONENTS */
import { Col, Row } from "antd";

/* HOOKS */
import useCloud from "../../hooks/useCloud";
import useStatus from "../../hooks/useStatus";
import useEfficientRansac from "../../hooks/processing/useEfficientRansac";

/* UTILS */
import { useTranslation } from "react-i18next";
import { SOFTWARE_VERSION } from "../../utils/constants/version";

const Footer: FC = () => {
  const { t } = useTranslation();
  const { status } = useStatus();
  const { applied: isEfficientRansacApplied } = useEfficientRansac();
  const { conesCount, plansCount, spheresCount, cylindersCount } = useCloud();

  return (
    <Row className="w-full h-16 bg-light-grey px-16">
      <Col span={8}>
        {isEfficientRansacApplied && (
          <Row justify="start" align="middle" className="h-16">
            <span className="font-bold text-brown text-base">
              <span className="text-yellow">{`${conesCount} ${t(
                "common.cone"
              )}s`}</span>{" "}
              |{" "}
              <span className="text-blue">{`${cylindersCount} ${t(
                "common.cylinder"
              )}s`}</span>{" "}
              |{" "}
              <span className="text-red-500">{`${plansCount} ${t(
                "common.plane"
              )}s`}</span>{" "}
              |{" "}
              <span className="text-green">{`${spheresCount} ${t(
                "common.sphere"
              )}s`}</span>
            </span>
          </Row>
        )}
      </Col>
      <Col span={8} className="flex items-end h-16 justify-center">
        <span className="text-xs text-brown mb-3 ml-2 font-light">{`v${SOFTWARE_VERSION}`}</span>
      </Col>
      <Col span={8} className="h-16">
        <Row justify="end" align="middle" className="h-16">
          <span className="text-brown">
            <span className="font-semibold">Status: </span>
            {t(`status.${status}`)}
          </span>
        </Row>
      </Col>
    </Row>
  );
};

export default Footer;
