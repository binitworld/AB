import json
import requests
import pymysql

def lambda_handler(event, context):
    # Call the API
    api_url = 'https://api.example.com/data'
    response = requests.get(api_url)
    
    try:
        conn = pymysql.connect(
            host='your-rds-endpoint',
            user='binitworld',
            password='0014ce3e52359af',
            database='AbBank',
            port=3306
        )
        
        with conn.cursor() as cursor:
            # Create a table if it doesn't exist
            create_table_query = '''
                CREATE TABLE IF NOT EXISTS example_table (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    age INT NOT NULL
                )
            '''
            cursor.execute(create_table_query)
            
            # Insert data into the table
            insert_query = '''
                INSERT INTO example_table (name, age) VALUES (%s, %s)
            '''
            cursor.execute(insert_query, ('John', 30))
            
            
            conn.commit()

            cursor.execute('SELECT * FROM example_table')
            rows = cursor.fetchall()
            data = [{'id': row[0], 'name': row[1], 'age': row[2]} for row in rows]
            
            
            conn.close()
            
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'Data inserted successfully',
                    'data': data
                })
            }
            
    except pymysql.MySQLError as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': f'Error connecting to the database: {e}'
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': f'An error occurred: {e}'
            })
        }
