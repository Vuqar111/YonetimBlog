import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RichTextEditor({description, setDescription}: {
  description: string;
  setDescription: (description: string) => void;
}) {

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'list',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'link',
  ];

  const handleTextChange = (html: string) => {
    setDescription(html);
  };


  const editorStyle = {
    height: '150px', // Set your desired height here
  };
  return (
    <div className="mb-12">
      <label className="mb-2.5 block text-black ">
       Blog description
      </label>
      <ReactQuill
        value={description}
        onChange={handleTextChange}
        modules={modules}
        formats={formats}
        theme="snow"
        style={editorStyle}
      />
    </div>
  );
}

export default RichTextEditor;
