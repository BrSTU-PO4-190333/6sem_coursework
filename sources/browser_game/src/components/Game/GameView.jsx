import React, { useEffect, useState } from 'react';
import styles from './GameView.module.css';
import GameController from './GameController';
import EndGameWindow from './../EndGameWindow/EndGameWindow';

function GameView() {
  const [game_instance, setGame_instance] = useState(new GameController());
  const [player1_button_disable, set_player1_button_disable] = useState(false);
  const [player2_button_disable, set_player2_button_disable] = useState(true);
  const [player1_cards, set_player1_cards] = useState([]);
  const [player2_cards, set_player2_cards] = useState([]);

  const [player1_pas, set_player1_pas] = useState(false);
  const [player1_damage, set_player1_damage] = useState(0);
  const [player1_swordsman_damage, set_player1_swordsman_damage] = useState(0);
  const [player1_archer_damage, set_player1_archer_damage] = useState(0);
  const [player1_artillery_damage, set_player1_artillery_damage] = useState(0);

  const [player2_pas, set_player2_pas] = useState(false);
  const [player2_damage, set_player2_damage] = useState(0);
  const [player2_swordsman_damage, set_player2_swordsman_damage] = useState(0);
  const [player2_archer_damage, set_player2_archer_damage] = useState(0);
  const [player2_artillery_damage, set_player2_artillery_damage] = useState(0);

  useEffect(function () {
    set_player1_cards(game_instance.get_player1_cards());
    set_player2_cards(game_instance.get_player2_cards());
  });

  function player1_button_clicked(id) {
    if (player1_button_disable === true) {
      return;
    }

    if (player1_pas === true) {
      return;
    }

    if (player2_pas === false) {
      set_player1_button_disable(true);
      set_player2_button_disable(false);
    }

    game_instance.player1_take_card(id);

    set_player1_cards(game_instance.get_player1_cards());
    set_player1_damage(game_instance.get_player1_all_damage());
    set_player1_swordsman_damage(game_instance.get_player1_swordsman_damage());
    set_player1_archer_damage(game_instance.get_player1_archer_damage());
    set_player1_artillery_damage(game_instance.get_player1_arlillery_damage());
  }

  function player2_button_clicked(id) {
    if (player2_button_disable === true) {
      return;
    }

    if (player2_pas === true) {
      return;
    }

    if (player1_pas === false) {
      set_player2_button_disable(true);
      set_player1_button_disable(false);
    }

    game_instance.player2_take_card(id);

    set_player2_cards(game_instance.get_player2_cards());
    set_player2_damage(game_instance.get_player2_all_damage());
    set_player2_swordsman_damage(game_instance.get_player2_swordsman_damage());
    set_player2_archer_damage(game_instance.get_player2_archer_damage());
    set_player2_artillery_damage(game_instance.get_player2_arlillery_damage());
  }

  function player1_pas_clicked() {
    if (player1_pas === true) {
      return;
    }

    set_player1_pas(true);
    set_player1_button_disable(true);

    if (player2_pas === false) {
      set_player2_button_disable(false);
    }
  }

  function player2_pas_clicked() {
    if (player2_pas === true) {
      return;
    }

    set_player2_pas(true);
    set_player2_button_disable(true);

    if (player1_pas === false) {
      set_player1_button_disable(false);
    }
  }

  return (
    <div className={styles.game_wrapper}>
      {player1_pas === true && player2_pas === true ? (
        <EndGameWindow
          player1_name={'Player1'}
          player2_name={'Player2'}
          player1_damage={player1_damage}
          player2_damage={player2_damage}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
      <div className={styles.player_s_card_field}>
        <div className={styles.statistic_block}></div>
        <div className={styles.game_cards_block}>
          {player2_cards.map((element, index) => {
            return element.where === 'onHome' ? (
              <img
                className={
                  player2_button_disable
                    ? styles.image_disables
                    : styles.image_enabled
                }
                key={index}
                src={element.img}
                alt=""
                onClick={(event) => player2_button_clicked(element.id)}
              />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <div className={styles.statistic_block}></div>
      </div>
      <div className={styles.heavy_weapons_field}>
        <DamageBlock damage={player2_artillery_damage} />
        <div className={styles.game_cards_block}>
          {player2_cards.map((element, index) => {
            return element.where === 'onWar' && element.type === 'artillery' ? (
              <img key={index} src={element.img} alt="" />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <div className={styles.statistic_block}></div>
      </div>
      <div className={styles.field_of_archers}>
        <DamageBlock damage={player2_archer_damage} />
        <div className={styles.game_cards_block}>
          {player2_cards.map((element, index) => {
            return element.where === 'onWar' && element.type === 'archer' ? (
              <img key={index} src={element.img} alt="" />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <DamageBlock damage={player2_damage} />
      </div>
      <div className={styles.field_of_swordsmen}>
        <DamageBlock damage={player2_swordsman_damage} />
        <div className={styles.game_cards_block}>
          {player2_cards.map((element, index) => {
            return element.where === 'onWar' && element.type === 'swordsman' ? (
              <img key={index} src={element.img} alt="" />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <div className={styles.statistic_block}>
          <button
            className={`${
              player2_button_disable
                ? styles.button_disables
                : styles.button_enabled
            } ${player2_pas === true ? styles.button_pas : ''}`}
            onClick={(event) => player2_pas_clicked()}
          >
            ПАС
          </button>
        </div>
      </div>
      <div className={styles.field_of_swordsmen}>
        <DamageBlock damage={player1_swordsman_damage} />
        <div className={styles.game_cards_block}>
          {player1_cards.map((element, index) => {
            return element.where === 'onWar' && element.type === 'swordsman' ? (
              <img key={index} src={element.img} alt="" />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <div className={styles.statistic_block}>
          <button
            className={`${
              player1_button_disable
                ? styles.button_disables
                : styles.button_enabled
            } ${player1_pas === true ? styles.button_pas : ''}`}
            onClick={(event) => player1_pas_clicked()}
          >
            ПАС
          </button>
        </div>
      </div>
      <div className={styles.field_of_archers}>
        <DamageBlock damage={player1_archer_damage} />
        <div className={styles.game_cards_block}>
          {player1_cards.map((element, index) => {
            return element.where === 'onWar' && element.type === 'archer' ? (
              <img key={index} src={element.img} alt="" />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <DamageBlock damage={player1_damage} />
      </div>
      <div className={styles.heavy_weapons_field}>
        <DamageBlock damage={player1_artillery_damage} />
        <div className={styles.game_cards_block}>
          {player1_cards.map((element, index) => {
            return element.where === 'onWar' && element.type === 'artillery' ? (
              <img key={index} src={element.img} alt="" />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <div className={styles.statistic_block}></div>
      </div>
      <div className={styles.player_s_card_field}>
        <div className={styles.statistic_block}></div>
        <div className={styles.game_cards_block}>
          {player1_cards.map((element, index) => {
            return element.where === 'onHome' ? (
              <img
                className={
                  player1_button_disable
                    ? styles.image_disables
                    : styles.image_enabled
                }
                key={index}
                src={element.img}
                alt=""
                onClick={(event) => player1_button_clicked(element.id)}
              />
            ) : (
              <React.Fragment key={index}></React.Fragment>
            );
          })}
        </div>
        <div className={styles.statistic_block}></div>
      </div>
    </div>
  );
}

function DamageBlock(props) {
  return <div className={styles.statistic_block}>{props.damage}</div>;
}

export default GameView;
