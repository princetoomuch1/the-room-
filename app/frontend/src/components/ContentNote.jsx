import CrisisResources from "./CrisisResources";

export default function ContentNote({ note, region, onContinue, onSkip }) {
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="cn-title">
      <h2 id="cn-title">Content note</h2>
      <p>{note.text}</p>
      <CrisisResources region={region} />
      <div className="row">
        <button onClick={onContinue}>Enter</button>
        <button onClick={onSkip}>Skip this room</button>
      </div>
    </div>
  );
}
