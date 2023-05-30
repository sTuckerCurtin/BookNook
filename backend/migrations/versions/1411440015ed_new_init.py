"""new init

Revision ID: 1411440015ed
Revises: 31385c4ee081
Create Date: 2023-05-30 14:10:48.127669

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '1411440015ed'
down_revision = '31385c4ee081'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('text', sa.String(length=255), nullable=False))
        batch_op.add_column(sa.Column('rating', sa.Integer(), nullable=False))
        batch_op.drop_column('title')
        batch_op.drop_column('thumbnail_url')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('review', schema=None) as batch_op:
        batch_op.add_column(sa.Column('thumbnail_url', mysql.TEXT(), nullable=False))
        batch_op.add_column(sa.Column('title', mysql.VARCHAR(length=255), nullable=False))
        batch_op.drop_column('rating')
        batch_op.drop_column('text')

    # ### end Alembic commands ###
