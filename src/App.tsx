import React, { useState } from "react";
import { FolderInput, TreeFileComponent } from "src/common";
import { convertListFileToObjectParentTree, readTemplate } from "src/utils";
import classes from "./index.module.scss";

function App() {
  const [root, setRoot] = useState("");
  const [fileTree, setFileTree] = useState(null);
  const [mappedFileItems, setMappedFileItems] = useState({});
  const [currentSelectFile, setCurrentSelectFile] = useState<
    string | null | undefined
  >(null);

  return (
    <div className={classes.editorContainer}>
      <div
        className={classes.treeContainer}
      >
        <FolderInput
          onChange={(event) => {
            const files = event.target.files || {};
            const tempedMappedFiles = {};
            const mappedFiles = Object.values(files).map((item: any) => {
              tempedMappedFiles[item.webkitRelativePath] = item;
              return {
                name: item.name,
                webkitRelativePath: item.webkitRelativePath,
              };
            });
            const template = convertListFileToObjectParentTree(mappedFiles);
            setRoot(Object.keys(template)[0]);
            const value = readTemplate(template, {});

            setFileTree(value);
            setMappedFileItems(tempedMappedFiles);
          }}
        />
        {fileTree && (
          <TreeFileComponent
            data={fileTree}
            root={root}
            onSelectItems={(items, treeId) => {
              const file = mappedFileItems[items[0]];
              if (file) {
                setCurrentSelectFile(URL.createObjectURL(file));
              } else {
                setCurrentSelectFile(null);
              }
            }}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        {currentSelectFile && (
          <embed
            style={{ width: "100%", height: "100%" }}
            src={currentSelectFile}
          />
        )}
      </div>
    </div>
  );
}

export default App;
