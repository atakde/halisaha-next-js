import React, { useState, useRef, useEffect } from "react";
import {
  List,
  Divider,
  Input,
  Button,
  notification,
  Popconfirm,
  message,
  Modal,
  Badge,
} from "antd";
import {
  DeleteOutlined,
  UserOutlined,
  UserAddOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import YouTube from "react-youtube";

const PlayerList = (props) => {
  const [data, setData] = useState([]);

  const [inputVal, setInputVal] = useState("");

  const inputRef = useRef(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    let players = [];
    if (props.players) {
      props.players.forEach((el) => {
        players.push({
          id: el.id,
          name: el.name,
        });
      });
    }
    setData(players);
  }, []);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message,
      placement: "bottomRight",
    });
  };

  async function addPlayerRequest(name) {
    try {
      const response = await fetch("/api/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, matchId: props.matches[0].id }),
      });
      return await response.json();
    } catch (error) {
      return false;
    }
  }

  async function deletePlayerRequest(playerId) {
    try {
      const response = await fetch("/api/player/" + playerId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      return false;
    }
  }

  const addUser = () => {
    let userAlreadyExist = false;
    data.forEach((item) => {
      if (item.name.toLowerCase() === inputVal.toLowerCase()) {
        userAlreadyExist = true;
      }
    });
    if (userAlreadyExist) {
      openNotificationWithIcon("error", "Bu isimle bir oyuncu zaten var.");
      setInputVal("");
      return;
    }
    const newList = [...data];
    addPlayerRequest(inputVal).then((result) => {
      if (result) {
        newList.unshift({ name: result.name, id: result.id });
        setData(newList);
        if (newList.length > 20) {
          openNotificationWithIcon(
            "warning",
            `${inputVal}, liste full olduğu için şuan yedeksiniz.`
          );
        } else {
          openNotificationWithIcon("success", `${inputVal} eklendi.`);
        }
      } else {
        message.error("ERROR");
      }
    });

    setInputVal("");
    inputRef.current.focus();
  };

  const handleInput = (event) => {
    if (event.code === "Enter") {
      addUser();
    }
  };

  function confirmDelete(e, player) {
    console.log(player);
    deletePlayerRequest(player.id).then((res) => {
      if (res) {
        const filteredData = data.filter((item) => item.id !== player.id);
        setData(filteredData);
        message.success("Başarıyla silindi.");
      } else {
        message.error("Error in delete proccess.");
      }
    });
  }

  return (
    <>
      <div className="input-container">
        <Input
          size="large"
          placeholder="username..."
          prefix={<UserOutlined />}
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => handleInput(e)}
          ref={inputRef}
        />
        <Button type="primary" onClick={addUser}>
          Add <UserAddOutlined />
        </Button>
      </div>
      <div className="input-container notification">
        <Badge dot>
          <NotificationOutlined style={{ fontSize: 16 }} />
        </Badge>
        <Badge>
          <a onClick={showModal}>Duyurular için tıklayınız!</a>
        </Badge>
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <YouTube videoId="sy6rrQVkpDk" opts={opts} />
      </Modal>
      <Divider orientation="center">Oyuncu Listesi</Divider>
      <List
        header={
          <div>
            Oyuncu Sayısı:{" "}
            <span className="player-count">{data.length} / 20</span>
          </div>
        }
        bordered
        dataSource={data}
        size="small"
        renderItem={(item, index) => {
          return (
            <List.Item>
              <span
                className={
                  data.length - index <= 20 ? "active-item" : "backup-item"
                }
              >
                {item.name} ({data.length - index <= 20 ? "Oyuncu" : "Yedek"}{" "}
                {data.length - index <= 20
                  ? data.length - index
                  : data.length - index - 20}
                )
              </span>
              <Popconfirm
                title="Silmek istiyor musunuz?"
                onConfirm={(e) => confirmDelete(e, item)}
                okText="Sil"
                cancelText="Vazgeç"
              >
                <DeleteOutlined
                  style={{
                    color: "#F23A3C",
                    fontSize: "30px",
                    cursor: "pointer",
                  }}
                />
              </Popconfirm>
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default PlayerList;
