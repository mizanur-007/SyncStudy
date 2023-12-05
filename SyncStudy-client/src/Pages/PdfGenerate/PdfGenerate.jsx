import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';
import LoaderPage from '../LoaderPage/LoaderPage';
import { useEffect, useState } from 'react';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'col',
    backgroundColor: '#D1FAE5',
    width: '100%',
  },
  section: {
    margin: 2,
    marginTop:4,
    padding: 18,
    flexGrow: 1
  },
  sectionContainer:{
    margin: 2,
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 14
  },
  link: {
    color: 'blue',
    fontSize: 10
  }
});

const PdfGenerate = () => {

    const [submissions, setSubmissions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://sync-study-server.vercel.app/api/v1/submissions", { withCredentials: true });
            setSubmissions(response.data);
            setIsLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

        

    if(isLoading){
        return <LoaderPage></LoaderPage>
    }

    return (
        <Document>
        <Page size="A4" style={styles.page}>


{
    submissions?.map(item => <>
    <View style={styles.sectionContainer} key={item.id}>
              <View style={styles.section}>
            <Text style={styles.paragraph}>{item.title}</Text>
            <Text  style={styles.paragraph}>Submitted By: {item.submitter_name}</Text>
            <Text  style={styles.link}>{item.drive_link} </Text>
            
          </View>
          </View>
    </>)
}

        </Page>
      </Document>
    );
};

export default PdfGenerate;