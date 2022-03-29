import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
} from "reactstrap";
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function MainComponent() {
  const [url, setUrl] = useState("");
  const [filetype, setFiletype] = useState("png");
  const [device, setDevice] = useState("");
  const [data, setData] = useState({ file: "", filetype: "" });
  const [urlValidate, setUrlValidate] = useState("");
  const [initalValue, setInitalValue] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const TITLE = "Website screenshot";

  let handleSubmit = async (e) => {
    e.preventDefault();
    const deviceString = device ? "&device=" + device : "";
    try {
      setShow(false);
      setLoading(true);
      console.log(apiUrl + filetype + "?url=" + url + deviceString);
      const response = await axios.get(
        apiUrl + filetype + "?url=" + url + deviceString,
      );
      setData({
        file: response.data.url,
        filename: response.data.filename,
        filetype: response.data.filetype,
      });
      console.log(response.data);
      setShow(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const urlPatternValidation = (e) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
    );
    setUrlValidate(regex.test(e));
    //console.log(urlValidate + url);
  };

  return (
    <div className="main">
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <h1>Website Screenshot</h1>
      <p>Take screen captures of websites on Desktop or Mobiles </p>
      <Container className="d-flex justify-content-center">
        <Row>
          <Col>
            <Form inline onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="url"
                  value={url}
                  name="url"
                  id="url"
                  placeholder="http://"
                  valid={urlValidate}
                  invalid={!urlValidate && initalValue}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    urlPatternValidation(e.target.value);
                    setInitalValue(true);
                  }}
                  className="mr-3"
                />
                <Input
                  type="select"
                  name="filetype"
                  value={filetype}
                  id="filetype"
                  onChange={(e) => {
                    setFiletype(e.target.value);
                    alert(e.target.value);
                  }}
                  className="mr-3"
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="pdf">PDF</option>
                </Input>
                <Input
                  type="select"
                  name="device"
                  id="device"
                  value={device}
                  onChange={(e) => {
                    setDevice(e.target.value);
                  }}
                  className="mr-3"
                >
                  <option value="">Desktop</option>
                  <option value="Galaxy Note 3">Galaxy Note 3</option>
                  <option value="Galaxy Note 3 landscape">
                    Galaxy Note 3 landscape
                  </option>
                  <option value="Galaxy Note II'">Galaxy Note II'</option>
                  <option value="Galaxy Note II landscape">
                    Galaxy Note II landscape
                  </option>
                  <option value="Galaxy S8">Galaxy S8</option>
                  <option value="Galaxy S8 landscape">
                    Galaxy S8 landscape
                  </option>
                  <option value="Galaxy S9+">Galaxy S9+</option>
                  <option value="Galaxy S9+ landscape">
                    Galaxy S9+ landscape
                  </option>
                  <option value="Galaxy Tab S4">Galaxy Tab S4</option>
                  <option value="Galaxy Tab S4 landscape">
                    Galaxy Tab S4 landscape
                  </option>
                  <option value="iPad">iPad</option>
                  <option value="iPad landscape">iPad landscape</option>
                  <option value="iPad (gen 6)">iPad (gen 6)</option>
                  <option value="iPad (gen 6) landscape">
                    iPad (gen 6) landscape
                  </option>
                  <option value="iPad (gen 7) landscape">
                    iPad (gen 7) landscape
                  </option>
                  <option value="iPad Mini">iPad Mini</option>
                  <option value="iPad Mini landscape">
                    iPad Mini landscape
                  </option>
                  <option value="iPad Pro">iPad Pro</option>
                  <option value="iPad Pro landscape">iPad Pro landscape</option>
                  <option value="iPad Pro 11">iPad Pro 11</option>
                  <option value="iPad Pro 11 landscape">
                    iPad Pro 11 landscape
                  </option>
                  <option value="iPhone SE">iPhone SE</option>
                  <option value="iPhone SE landscape">
                    iPhone SE landscape
                  </option>
                  <option value="iPhone X">iPhone X</option>
                  <option value="iPhone X landscape">iPhone X landscape</option>
                  <option value="iPhone XR">iPhone XR</option>
                  <option value="iPhone XR landscape">
                    iPhone XR landscape
                  </option>
                  <option value="iPhone 11 Pro Max">iPhone 11 Pro Max</option>
                  <option value="iPhone 11 Pro Max landscape">
                    iPhone 11 Pro Max landscape
                  </option>
                  <option value="iPhone 12">iPhone 12</option>
                  <option value="iPhone 12 landscape">
                    iPhone 12 landscape
                  </option>
                  <option value="iPhone 12 Pro">iPhone 12 Pro</option>
                  <option value="iPhone 12 Pro landscape">
                    iPhone 12 Pro landscape
                  </option>
                  <option value="iPhone 12 Pro Max">iPhone 12 Pro Max</option>
                  <option value="iPhone 12 Pro Max landscape">
                    iPhone 12 Pro Max landscape
                  </option>
                  <option value="iPhone 12 Mini">iPhone 12 Mini</option>
                  <option value="iPhone 12 Mini landscape">
                    iPhone 12 Mini landscape
                  </option>
                  <option value="iPhone 13">iPhone 13</option>
                  <option value="iPhone 13 landscape">
                    iPhone 13 landscape
                  </option>
                  <option value="iPhone 13 Pro">iPhone 13 Pro</option>
                  <option value="iPhone 13 Pro landscape">
                    iPhone 13 Pro landscape
                  </option>
                  <option value="iPhone 13 Pro Max">iPhone 13 Pro Max</option>
                  <option value="iPhone 13 Pro Max landscape">
                    iPhone 13 Pro Max landscape
                  </option>
                  <option value="iPhone 13 Mini">iPhone 13 Mini</option>
                  <option value="iPhone 13 Mini landscape">
                    iPhone 13 Mini landscape
                  </option>
                </Input>
                <Button color="primary" disabled={!urlValidate}>
                  Capture
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
      <div>
        <Container className="mt-5">
          <Row>
            <Col className="">
              <DisplayDownload
                apiUrl={apiUrl}
                filename={data.filename}
                filetype={data.filetype}
                show={show}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="d-flex justify-content-center">
              <DisplayLoading loading={loading} />
              <Display file={data.file} type={filetype} show={show} />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

const Display = ({ file, type, show }) => {
  console.log("===>" + show);
  if (show && (type === "png" || type === "jpg"))
    return <img src={file} width="500" height="500" />;
  if (show && file === "pdf")
    return <iframe src={file} width="500" height="500" />;
  return <div></div>;
};

const DisplayDownload = ({ apiUrl, filename, filetype, show }) => {
  if (show)
    return (
      <a
        href={`${apiUrl}download?file=${filename}&type=${filetype}`}
        className="btn btn-primary btn-lg"
      >
        Download
      </a>
    );
  return <div></div>;
};
const DisplayLoading = ({ loading }) => {
  if (loading) return <BallTriangle color="#00BFFF" height={100} width={130} />;
  return <div></div>;
};
