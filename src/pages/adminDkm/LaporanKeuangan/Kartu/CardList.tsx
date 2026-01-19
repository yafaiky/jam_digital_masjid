import React from 'react';
import { Table, Button, Popconfirm, message, Tag } from 'antd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useFinanceCards } from '../../../../hooks/useFinanceCards';

interface CardListProps {
  onEdit: (card: any) => void;
}

const CardList: React.FC<CardListProps> = ({ onEdit }) => {
  const { cards, loading, deleteCard } = useFinanceCards();

  const handleDelete = async (id: number) => {
    try {
      await deleteCard(id);
      message.success('Kartu berhasil dihapus');
    } catch {
      message.error('Gagal menghapus kartu');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Nama Kartu',
      dataIndex: 'card_name',
      key: 'card_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'aktif' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Dibuat',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) =>
        new Date(date).toLocaleDateString('id-ID'),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            icon={<FaEdit />}
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>

          <Popconfirm
            title="Apakah Anda yakin ingin menghapus kartu ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<FaTrash />}
            >
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={cards}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default CardList;
