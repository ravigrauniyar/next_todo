import modalProps from "@/utils/ModalPropsData.json";

type ModalTypeProps = {
  type: string;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};
type ModalProps = {
  header: string;
  body: string;
};

enum HeaderColor {
  Update = "text-yellow-500",
  Delete = "text-red-500",
}
export default function Modal(modalTypeProps: ModalTypeProps) {
  const { type, title, onConfirm, onCancel } = modalTypeProps;
  const props: ModalProps =
    type === "Update" ? modalProps.update : modalProps.delete;

  const headerColor =
    type === "Update" ? HeaderColor.Update : HeaderColor.Delete;

  const { header, body } = props;
  return (
    <div className="absolute top-0 left-0 z-10 flex-center w-full h-[100vh] bg-[rgba(255,255,255,0.1)] text-white">
      <div className="w-[500px] min-h-[250px] flex flex-col rounded-md shadow-md bg-gray-600 p-5">
        <div
          className={`pb-5 text-center ${headerColor} text-[24px] font-[500]`}
        >
          {header}
        </div>
        <div className="py-2">{`${body} "${title}"?`}</div>
        <div className="flex-grow" />
        <div className="flex gap-5">
          <button
            onClick={onConfirm}
            className="btn flex-center bg-gray-500 hover:bg-gray-700"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="btn flex-center bg-red-500 hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
