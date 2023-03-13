import React, { ChangeEvent, useEffect, useRef } from 'react';

interface FolderInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function FolderInput(props: FolderInputProps) {
  const { onChange } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
      ref.current.setAttribute("mozdirectory", "");
    }
  }, [ref]);

  return (
    <input
      type="file"
      ref={ref}
      onChange={onChange}
    />
  )
}
