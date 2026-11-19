import pymysql

pymysql.install_as_MySQLdb()

# Enable Django 6.x to support MySQL 8.0 LTS (e.g. 8.0.46) alongside 8.4+
from django.db.backends.mysql.features import DatabaseFeatures

DatabaseFeatures.minimum_database_version = property(
    lambda self: (10, 11) if self.connection.mysql_is_mariadb else (8, 0)
)
