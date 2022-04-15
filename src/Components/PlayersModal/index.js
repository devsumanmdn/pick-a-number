import React from "react";
import PropTypes from "prop-types";
import Modal from "../Modal";
import classes from "./PlayerModal.module.scss";

function PlayerModal({
  open,
  onClose,
  players,
  setPlayers,
  generateAvatar,
  addPlayer,
}) {
  const handleNameChange = (e, id) => {
    const name = e.target.value;

    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        ...(player.id === id ? { name } : {}),
      }))
    );
  };

  const handleAvatarChange = (id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        ...(player.id === id
          ? {
              avatarSeedTry: ++player.avatarSeedTry,
              avatar: generateAvatar(
                `Player ${id} try ${++player.avatarSeedTry}`
              ),
            }
          : {}),
      }))
    );
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleAddPlayer = () => {
    addPlayer();
  };

  const removePlayer = (e, id) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== id)
    );
  };

  return (
    <Modal isOpen={open}>
      <h2>Player Settings</h2>
      <form onSubmit={handleClose} className={classes.root}>
        {players.map((playerObj) => (
          <fieldset key={playerObj.id} className={classes.fieldset}>
            <img
              onClick={() => handleAvatarChange(playerObj.id)}
              src={playerObj.avatar}
              height={50}
              width={50}
            />
            <label>Player {playerObj.id + 1}</label>
            <input
              type={"text"}
              value={playerObj.name}
              onChange={(e) => handleNameChange(e, playerObj.id)}
            />
            <button
              disabled={!(players.length > 2)}
              title={!(players.length > 2) ? "Atleast 2 players are required!" : ""}
              onClick={(e) => removePlayer(e, playerObj.id)}
              className={classes.removeBtn}
            >
              ❌
            </button>
          </fieldset>
        ))}

        <div className={classes.actions}>
          <button
            className={classes.addPlayerBtn}
            onClick={handleAddPlayer}
            type="button"
          >
            Add Player
          </button>
          <button className={classes.doneBtn} type={"submit"}>
            Done
          </button>
        </div>
      </form>
    </Modal>
  );
}

PlayerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      avatarSeedTry: PropTypes.number.isRequired,
    })
  ).isRequired,
  setPlayers: PropTypes.func.isRequired,
  generateAvatar: PropTypes.func.isRequired,
  addPlayer: PropTypes.func.isRequired,
};

export default PlayerModal;
